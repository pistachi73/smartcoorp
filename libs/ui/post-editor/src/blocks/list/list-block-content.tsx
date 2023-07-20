import debounce from 'lodash.debounce';
import { FormEvent, useCallback, useMemo } from 'react';

import { useBlocksDBUpdaterContext } from '../../contexts/blocks-context';
import {
  ToAddBlock,
  ToRemoveBlock,
} from '../../contexts/blocks-context/blocks-reducer';
import { useDebounceContext } from '../../contexts/debounce-context/debounce-context';
import { useRefsContext } from '../../contexts/refs-context';
import { useToolBlockIndexUpdaterContext } from '../../contexts/tool-control-context/tool-control-context';
import { ListField } from '../../fields/list-field';
import {
  buildListBlock,
  buildParagraphBlock,
  getCaretPosition,
  waitForElement,
} from '../../helpers';
import { getElementTextContent } from '../../helpers/get-element-textcontent';
import type { ListBlockContentProps } from '../blocks.types';

export const ListBlockContent: React.FC<ListBlockContentProps> = ({
  blockIndex,
  chainBlockIndex,
  chainId,
  block,
}) => {
  const {
    setFieldValue,
    replaceBlocks,
    buildFocusFieldAction,
    buildModifyListInnerHTMLAction,
  } = useBlocksDBUpdaterContext();
  const { fieldRefs, setPrevCaretPosition, prevCaretPosition } =
    useRefsContext();
  const setToolIndex = useToolBlockIndexUpdaterContext();
  const { debounceTime } = useDebounceContext();
  const fieldIndex = 0;
  const fieldId = `${block.id}_${fieldIndex}`;

  const onItemsChange = useCallback(
    (items: string[]) => {
      const currentCaretPosition = getCaretPosition(
        fieldRefs.current[blockIndex] ? fieldRefs.current[blockIndex][0] : null
      );

      setFieldValue({
        blockId: block.id,
        blockType: 'list',
        field: 'items',
        value: items,
        undo: buildModifyListInnerHTMLAction({
          fieldId,
          caretPosition: prevCaretPosition.current,
        }),
        redo: buildModifyListInnerHTMLAction({
          fieldId,
          value: items,
          caretPosition: currentCaretPosition,
        }),
      });

      setPrevCaretPosition(currentCaretPosition);
    },
    [
      fieldRefs,
      blockIndex,
      setFieldValue,
      block.id,
      buildModifyListInnerHTMLAction,
      fieldId,
      prevCaretPosition,
      setPrevCaretPosition,
    ]
  );

  const debouncedOnItemsChange = useMemo(() => {
    return debounce(onItemsChange, debounceTime);
  }, [debounceTime, onItemsChange]);

  const onInputChange = (e: FormEvent<HTMLOListElement | HTMLUListElement>) => {
    setToolIndex(null);

    debouncedOnItemsChange(
      [].slice
        .call(e.currentTarget.children)
        .map((node: Element) => node.innerHTML.trim())
    );
  };

  const handleItemKeyPress = async (e: React.KeyboardEvent) => {
    const element = e.target;

    const caretPosition = getCaretPosition(element);
    const textContent = getElementTextContent(element);
    const items = [].slice
      .call(e.currentTarget.children)
      .map((node: Element) => node.innerHTML.trim());

    if (
      (e.key === 'Enter' || e.key === 'Backspace') &&
      ((caretPosition === 0 && items[0] === '<br>') ||
        (caretPosition === textContent.length &&
          items[items.length - 1] === '<br>'))
    ) {
      // Split list item
      debouncedOnItemsChange.cancel();
      e.preventDefault();
      e.stopPropagation();

      const modifiedIndex = caretPosition === 0 ? 0 : items.length - 1;
      const afterListItems = items.slice(modifiedIndex + 1);
      const beforeListItems = items.slice(0, modifiedIndex);

      const afterListBlock =
        afterListItems.length > 0
          ? [buildListBlock(chainId, afterListItems, block.data.style)]
          : [];
      const beforeListBlock =
        beforeListItems.length > 0
          ? [buildListBlock(chainId, beforeListItems, block.data.style)]
          : [];

      const paragraphBlock = buildParagraphBlock(chainId);

      const toBlocksData = [
        ...beforeListBlock,
        paragraphBlock,
        ...afterListBlock,
      ];

      const toAddBlocks: ToAddBlock[] = toBlocksData.map((blockData, index) => [
        blockData,
        chainId,
        chainBlockIndex + index,
      ]);

      console.log({ toAddBlocks });
      const toRemoveBlocks: ToRemoveBlock[] = [[block.id, chainId]];

      replaceBlocks({
        toAddBlocks,
        toRemoveBlocks,
        undo: buildFocusFieldAction({
          fieldId: fieldId,
          position: prevCaretPosition.current,
        }),
        redo: buildFocusFieldAction({
          fieldId: `${paragraphBlock.id}_0`,
          position: 0,
        }),
      });

      (await waitForElement(`${paragraphBlock.id}_0`))?.focus();
      setPrevCaretPosition(0);
    }
  };

  return (
    <ListField
      blockId={block.id}
      blockIndex={blockIndex}
      field="items"
      fieldIndex={fieldIndex}
      items={block.data.items}
      style={block.data.style}
      onInput={onInputChange}
      data-block-type="list"
      onKeyDown={handleItemKeyPress}
    />
  );
};
