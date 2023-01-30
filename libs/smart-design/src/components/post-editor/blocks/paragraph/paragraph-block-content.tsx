import debounce from 'lodash.debounce';
import React, { useCallback, useMemo } from 'react';

import { useBlocksDBUpdaterContext } from '../../contexts/blocks-db-context/';
import { REMOVE_BLOCKS } from '../../contexts/blocks-db-context/blocks-db-reducer';
import {
  MERGE_TEXT_FIELDS,
  SPLIT_TEXT_FIELD,
} from '../../contexts/blocks-db-context/blocks-db-reducer/actions';
import {
  FOCUS_FIELD,
  MODIFY_FIELD_INNERHTML,
} from '../../contexts/blocks-db-context/undo-redo-reducer';
import { useRefsContext } from '../../contexts/refs-context';
import { TextField } from '../../fields/text-field';
import {
  getBlockContainerAttributes,
  getCaretPosition,
  getElementTextContent,
} from '../../helpers';
import { ParagraphBlockContentProps } from '../blocks.types';

export const ParagraphBlockContent: React.FC<ParagraphBlockContentProps> = ({
  blockIndex,
  chainBlockIndex,
  chainId,
  block,
}) => {
  const dispatchBlocksDB = useBlocksDBUpdaterContext();

  const {
    fieldRefs,
    blockRefs,
    setPrevCaretPosition,
    prevCaretPosition,
    focusField,
    getNextFocusableField,
  } = useRefsContext();

  const fieldIndex = 0;
  const fieldId = `${block.id}_${fieldIndex}`;

  const onTextChange = useCallback(
    (text: string) => {
      const currentCaretPosition = getCaretPosition(
        fieldRefs.current[blockIndex][0]
      );

      const undoAction = {
        type: MODIFY_FIELD_INNERHTML,
        payload: {
          fieldId,
          setPrevCaretPosition,
          caretPosition: prevCaretPosition.current,
        },
      } as const;

      const redoAction = {
        type: MODIFY_FIELD_INNERHTML,
        payload: {
          fieldId,
          caretPosition: currentCaretPosition,
          setPrevCaretPosition,
        },
      } as const;

      dispatchBlocksDB({
        type: 'MODIFY_FIELD',
        payload: {
          blockId: block.id,
          field: 'text',
          value: text,
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

  const debouncedOnTextChange = useMemo(() => {
    return debounce(onTextChange, 300);
  }, [onTextChange]);

  const onInputChange = useCallback(
    async (e: React.ChangeEvent) => {
      const innerHTML = e.target.innerHTML.trim();
      const isTextSplit = innerHTML.includes('<div>');

      if (isTextSplit) {
        debouncedOnTextChange.cancel();

        const undoAction = {
          type: MODIFY_FIELD_INNERHTML,
          payload: {
            fieldId,
            caretPosition: prevCaretPosition.current,
            setPrevCaretPosition,
          },
        } as const;

        const redoAction = {
          type: MODIFY_FIELD_INNERHTML,
          payload: {
            fieldId,
            caretPosition: 0,
            setPrevCaretPosition,
          },
        } as const;

        dispatchBlocksDB({
          type: SPLIT_TEXT_FIELD,
          payload: {
            blockId: block.id,
            chainId,
            field: 'text',
            chainBlockIndex,
            innerHTML,
            splitedBlockRef: fieldRefs.current[blockIndex][0],
            undoAction,
            redoAction,
          },
        });

        setPrevCaretPosition(0);
      } else {
        debouncedOnTextChange(innerHTML);
      }
    },
    [
      debouncedOnTextChange,
      fieldId,
      prevCaretPosition,
      setPrevCaretPosition,
      dispatchBlocksDB,
      block.id,
      chainId,
      chainBlockIndex,
      fieldRefs,
      blockIndex,
    ]
  );

  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent) => {
      const element = e.target as HTMLElement;
      const caretPosition = getCaretPosition(element);

      if (e.key === 'Backspace' && caretPosition === 0) {
        if (element.textContent?.length === 0) {
          // Remove block and focus previous block
          debouncedOnTextChange.cancel();
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
              fieldId: `${block.id}_${fieldIndex}`,
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
        if (
          element.textContent?.length !== 0 &&
          fieldRefs.current[blockIndex - 1][0].getAttribute(
            'data-field-type'
          ) === 'paragraph'
        ) {
          // Merge with previous paragraph block
          debouncedOnTextChange.cancel();
          e.preventDefault();
          e.stopPropagation();

          const prevBlock = blockRefs.current[blockIndex - 1];
          const prevFieldRef = fieldRefs.current[blockIndex - 1][0];
          const prevFieldContentLength =
            getElementTextContent(prevFieldRef).length;

          const undoAction = {
            type: MODIFY_FIELD_INNERHTML,
            payload: {
              fieldId: prevFieldRef.id,
              focusFieldId: fieldId,
              caretPosition: prevCaretPosition.current,
              setPrevCaretPosition,
            },
          } as const;

          const redoAction = {
            type: MODIFY_FIELD_INNERHTML,
            payload: {
              fieldId: prevFieldRef.id,
              caretPosition: prevFieldContentLength,
              setPrevCaretPosition,
            },
          } as const;

          dispatchBlocksDB({
            type: MERGE_TEXT_FIELDS,
            payload: {
              mergedFieldRef: prevFieldRef,
              mergedBlockRef: prevBlock,
              mergedField: 'text',
              removedInnerHTML: element.innerHTML,
              removedChainBlockIndex: chainBlockIndex,
              removedChainId: chainId,
              undoAction,
              redoAction,
            },
          });

          setPrevCaretPosition(prevFieldContentLength);
        }
      }
    },
    [
      fieldRefs,
      blockIndex,
      debouncedOnTextChange,
      getNextFocusableField,
      blockRefs,
      prevCaretPosition,
      setPrevCaretPosition,
      block.id,
      dispatchBlocksDB,
      chainId,
      focusField,
      fieldId,
      chainBlockIndex,
    ]
  );

  return (
    <TextField
      variant="paragraph"
      field="text"
      blockId={block.id}
      blockIndex={blockIndex}
      fieldIndex={fieldIndex}
      text={block.data.text}
      onInputChange={onInputChange}
      onKeyDown={handleKeyDown}
      data-field-type="paragraph"
    />
  );
};
