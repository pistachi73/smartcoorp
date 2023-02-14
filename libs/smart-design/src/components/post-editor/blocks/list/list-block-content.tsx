import debounce from 'lodash.debounce';
import { useCallback, useMemo } from 'react';

import { useBlocksDBUpdaterContext } from '../../contexts/blocks-context';
import { useRefsContext } from '../../contexts/refs-context';
import { useToolBlockIndexUpdaterContext } from '../../contexts/tool-control-context/tool-control-context';
import { ListField } from '../../fields/list-field';
import { getBlockContainerAttributes, getCaretPosition } from '../../helpers';
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
    removeBlocks,
    removeLastListItem,
    buildFocusFieldAction,
    buildModifyListInnerHTMLAction,
  } = useBlocksDBUpdaterContext();
  const {
    fieldRefs,
    setPrevCaretPosition,
    prevCaretPosition,
    getNextFocusableField,
    focusField,
    blockRefs,
  } = useRefsContext();
  const setToolIndex = useToolBlockIndexUpdaterContext();

  const fieldIndex = 0;
  const fieldId = `${block.id}_${fieldIndex}`;

  const onItemsChange = useCallback(
    (items: string[]) => {
      const currentCaretPosition = getCaretPosition(
        fieldRefs.current[blockIndex][0]
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
    return debounce(onItemsChange, 300);
  }, [onItemsChange]);

  const onInputChange = (e: React.ChangeEvent) => {
    setToolIndex(null);

    debouncedOnItemsChange(
      [].slice
        .call(e.currentTarget.children)
        .map((node: Element) => node.innerHTML.trim())
    );
  };

  const handleItemKeyPress = (e: React.KeyboardEvent) => {
    const element = e.target;

    const caretPosition = getCaretPosition(element);
    const textContent = getElementTextContent(element);
    if (e.key === 'Enter') {
      const items = [].slice
        .call(e.currentTarget.children)
        .map((node: Element) => node.innerHTML.trim());

      if (
        caretPosition === textContent.length &&
        items[items.length - 1] === '<br>'
      ) {
        // Remove last item if empty and create paragraph block
        debouncedOnItemsChange.cancel();
        e.preventDefault();
        e.stopPropagation();

        removeLastListItem({
          blockId: block.id,
          blockType: 'list',
          field: 'items',
          chainId,
          chainBlockIndex,
          fieldId,
          items,
          undo: buildModifyListInnerHTMLAction({
            fieldId,
            caretPosition: prevCaretPosition.current,
          }),
          redo: buildModifyListInnerHTMLAction({
            fieldId,
            caretPosition: 0,
          }),
        });

        setToolIndex(null);
      }
    }

    if (
      e.key === 'Backspace' &&
      caretPosition === 0 &&
      textContent.length === 0
    ) {
      debouncedOnItemsChange.cancel();
      e.preventDefault();
      e.stopPropagation();

      const prevFocusableBlock = getNextFocusableField(
        blockIndex,
        fieldIndex,
        -1
      );

      const { blockId: contiguousBlockId } = getBlockContainerAttributes(
        blockRefs.current[prevFocusableBlock[0]]
      );

      removeBlocks({
        toRemoveBlocks: [[block.id, chainId]],
        undo: buildFocusFieldAction({
          fieldId,
          position: prevCaretPosition.current,
        }),
        redo: buildFocusFieldAction({
          fieldId: `${contiguousBlockId}_${prevFocusableBlock[1]}`,
          position: 'end',
        }),
      });

      focusField(prevFocusableBlock, 'end');
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
      onInputChange={onInputChange}
      data-block-type="list"
      onKeyDown={handleItemKeyPress}
    />
  );
};
