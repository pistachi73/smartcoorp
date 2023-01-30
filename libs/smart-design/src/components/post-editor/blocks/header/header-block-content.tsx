import debounce from 'lodash.debounce';
import React, { useCallback, useMemo } from 'react';

import { useBlocksDBUpdaterContext } from '../../contexts/blocks-db-context';
import { REMOVE_BLOCKS } from '../../contexts/blocks-db-context/blocks-db-reducer';
import {
  MODIFY_FIELD,
  SPLIT_TEXT_FIELD,
} from '../../contexts/blocks-db-context/blocks-db-reducer/actions';
import {
  FOCUS_FIELD,
  MODIFY_FIELD_INNERHTML,
} from '../../contexts/blocks-db-context/undo-redo-reducer';
import { useRefsContext } from '../../contexts/refs-context';
import { TextField } from '../../fields/text-field';
import { debounceDelay, getCaretPosition } from '../../helpers';
import { getBlockContainerAttributes } from '../../helpers/get-block-container-attributes';
import { HeaderBlockContainerProps } from '../blocks.types';

const HEADLINE_SIZE_LEVELS = {
  1: 'xxxlarge',
  2: 'xxlarge',
  3: 'xlarge',
  4: 'large',
  5: 'medium',
  6: 'small',
} as const;

export const HeaderBlockContent: React.FC<
  HeaderBlockContainerProps & { text: string }
> = ({ blockIndex, chainBlockIndex, chainId, block, text }) => {
  const dispatchBlocksDB = useBlocksDBUpdaterContext();
  const {
    fieldRefs,
    blockRefs,
    prevCaretPosition,
    getNextFocusableField,
    focusField,
    setPrevCaretPosition,
  } = useRefsContext();

  const size = useMemo(
    () => HEADLINE_SIZE_LEVELS[block.data.level],
    [block.data.level]
  );
  const fieldIndex = useMemo(() => 0, []);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      const element = e.target as HTMLElement;
      const caretPosition = getCaretPosition(element);

      if (caretPosition === 0 && element.textContent?.length === 0) {
        e.preventDefault();
        e.stopPropagation();
        debouncedOnTextChange.cancel();

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
    }
  };

  const onTextChange = useCallback(
    (text: string) => {
      const currentCaretPosition = getCaretPosition(
        fieldRefs.current[blockIndex][0]
      );

      const undoAction = {
        type: MODIFY_FIELD_INNERHTML,
        payload: {
          fieldId: `${block.id}_${fieldIndex}`,
          caretPosition: prevCaretPosition.current,
          setPrevCaretPosition,
        },
      } as const;

      const redoAction = {
        type: MODIFY_FIELD_INNERHTML,
        payload: {
          fieldId: `${block.id}_${fieldIndex}`,
          caretPosition: currentCaretPosition,
          setPrevCaretPosition,
        },
      } as const;

      dispatchBlocksDB({
        type: MODIFY_FIELD,
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
      block.id,
      fieldIndex,
      prevCaretPosition,
      setPrevCaretPosition,
      dispatchBlocksDB,
    ]
  );

  const debouncedOnTextChange = useMemo(() => {
    return debounce(onTextChange, debounceDelay);
  }, [onTextChange]);

  const onInputChange = useCallback(
    async (e: React.ChangeEvent) => {
      const innerHTML = e.target.innerHTML;
      const isTextSplit = innerHTML.includes('<div>');

      if (isTextSplit) {
        debouncedOnTextChange.cancel();

        const undoAction = {
          type: MODIFY_FIELD_INNERHTML,
          payload: {
            fieldId: `${block.id}_${fieldIndex}`,
            caretPosition: prevCaretPosition.current,
            setPrevCaretPosition,
          },
        } as const;

        const redoAction = {
          type: MODIFY_FIELD_INNERHTML,
          payload: {
            fieldId: `${block.id}_${fieldIndex}`,
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
      } else {
        debouncedOnTextChange(innerHTML);
      }
    },
    [
      debouncedOnTextChange,
      block.id,
      fieldIndex,
      prevCaretPosition,
      setPrevCaretPosition,
      dispatchBlocksDB,
      chainId,
      chainBlockIndex,
      fieldRefs,
      blockIndex,
    ]
  );

  return (
    <TextField
      variant="header"
      field="text"
      size={size}
      forwardedAs={`h${block.data.level}`}
      blockId={block.id}
      blockIndex={blockIndex}
      fieldIndex={fieldIndex}
      text={text}
      onInputChange={onInputChange}
      onKeyDown={handleKeyDown}
      data-block-type="header"
    />
  );
};
