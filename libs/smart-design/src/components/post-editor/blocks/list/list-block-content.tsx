import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo } from 'react';

import { useBlocksDBUpdaterContext } from '../../contexts/blocks-db-context';
import { REMOVE_LAST_LIST_ITEM } from '../../contexts/blocks-db-context/blocks-db-reducer';
import {
  MODIFY_FIELD,
  REMOVE_BLOCKS,
} from '../../contexts/blocks-db-context/blocks-db-reducer/actions';
import {
  FOCUS_FIELD,
  MODIFY_LIST_INNERHTML,
} from '../../contexts/blocks-db-context/undo-redo-reducer/actions';
import { useRefsContext } from '../../contexts/refs-context';
import { useToolBlockIndexUpdaterContext } from '../../contexts/tool-control-context/tool-control-context';
import { ListField } from '../../fields/list-field';
import {
  getBlockContainerAttributes,
  getCaretPosition,
  setCaretPosition,
} from '../../helpers';
import { getElementTextContent } from '../../helpers/get-element-textcontent';
import type { ListBlockContentProps } from '../blocks.types';

export const ListBlockContent: React.FC<ListBlockContentProps> = ({
  blockIndex,
  chainBlockIndex,
  chainId,
  block,
}) => {
  const dispatchBlocksDB = useBlocksDBUpdaterContext();
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
      const undoAction = {
        type: MODIFY_LIST_INNERHTML,
        payload: {
          fieldId,
          setPrevCaretPosition,
          caretPosition: prevCaretPosition.current,
        },
      } as const;

      const redoAction = {
        type: MODIFY_LIST_INNERHTML,
        payload: {
          fieldId,
          value: items,
          caretPosition: currentCaretPosition,
          setPrevCaretPosition,
        },
      } as const;

      dispatchBlocksDB({
        type: MODIFY_FIELD,
        payload: {
          blockId: block.id,
          field: 'items',
          value: items,
          undoAction,
          redoAction,
        },
      });

      setPrevCaretPosition(currentCaretPosition);
    },
    [
      fieldRefs,
      blockIndex,
      fieldId,
      setPrevCaretPosition,
      prevCaretPosition,
      dispatchBlocksDB,
      block.id,
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

        const undoAction = {
          type: MODIFY_LIST_INNERHTML,
          payload: {
            fieldId,
            setPrevCaretPosition,
            caretPosition: prevCaretPosition.current,
          },
        } as const;

        const redoAction = {
          type: MODIFY_LIST_INNERHTML,
          payload: {
            fieldId,
            setPrevCaretPosition,
            caretPosition: 0,
          },
        } as const;

        dispatchBlocksDB({
          type: REMOVE_LAST_LIST_ITEM,
          payload: {
            blockId: block.id,
            chainId,
            chainBlockIndex,
            field: 'items',
            fieldId,
            items,
            undoAction,
            redoAction,
          },
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

      const undoAction = {
        type: FOCUS_FIELD,
        payload: {
          fieldId,
          position: prevCaretPosition.current,
          setPrevCaretPosition,
        },
      } as const;

      const redoAction = {
        type: FOCUS_FIELD,
        payload: {
          fieldId: `${contiguousBlockId}_${prevFocusableBlock[1]}`,
          position: 'end',
          setPrevCaretPosition,
        },
      } as const;

      dispatchBlocksDB({
        type: REMOVE_BLOCKS,
        payload: {
          toRemoveBlocks: [[block.id, chainId]],
          undoAction,
          redoAction,
        },
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
