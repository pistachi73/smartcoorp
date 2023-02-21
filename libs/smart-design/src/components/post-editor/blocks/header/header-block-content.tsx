import debounce from 'lodash.debounce';
import React, { useCallback, useMemo } from 'react';

import { useBlocksDBUpdaterContext } from '../../contexts/blocks-context';
import { useRefsContext } from '../../contexts/refs-context';
import { TextField } from '../../fields/text-field';
import { debounceDelay, getCaretPosition } from '../../helpers';
import { getBlockContainerAttributes } from '../../helpers/get-block-container-attributes';
import type { HeaderBlockProps } from '../../post-editor.types';
import type { HeaderBlockContentProps } from '../blocks.types';

const HEADLINE_SIZE_LEVELS: Record<HeaderBlockProps['data']['level'], string> =
  {
    1: 'xxxlarge',
    2: 'xxlarge',
    3: 'xlarge',
    4: 'large',
    5: 'medium',
    6: 'small',
  };

export const HeaderBlockContent: React.FC<HeaderBlockContentProps> = ({
  blockIndex,
  chainBlockIndex,
  chainId,
  block,
}) => {
  const {
    setFieldValue,
    splitTextField,
    removeBlocks,
    buildFocusFieldAction,
    buildModifyFieldInnerHTMLAction,
  } = useBlocksDBUpdaterContext();
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

  const fieldIndex = 0;

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

        removeBlocks({
          toRemoveBlocks: [[block.id, chainId]],
          undo: buildFocusFieldAction({
            fieldId: `${block.id}_${fieldIndex}`,
            position: prevCaretPosition.current,
          }),
          redo: buildFocusFieldAction({
            fieldId: `${contiguousBlockId}_${prevFocusableBlock[1]}`,
            position: 'end',
          }),
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

      setFieldValue({
        blockId: block.id,
        blockType: 'header',
        field: 'text',
        value: text,
        undo: buildModifyFieldInnerHTMLAction({
          fieldId: `${block.id}_${fieldIndex}`,
          caretPosition: prevCaretPosition.current,
        }),
        redo: buildModifyFieldInnerHTMLAction({
          fieldId: `${block.id}_${fieldIndex}`,
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
      buildModifyFieldInnerHTMLAction,
      prevCaretPosition,
      setPrevCaretPosition,
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

        splitTextField({
          blockId: block.id,
          blockType: 'header',
          field: 'text',
          chainId,
          chainBlockIndex,
          innerHTML,
          splitedBlockRef: fieldRefs.current[blockIndex][0],
          undo: buildModifyFieldInnerHTMLAction({
            fieldId: `${block.id}_${fieldIndex}`,
            caretPosition: prevCaretPosition.current,
          }),
          redo: buildModifyFieldInnerHTMLAction({
            fieldId: `${block.id}_${fieldIndex}`,
            caretPosition: 0,
          }),
        });

        setPrevCaretPosition(0);
      } else {
        debouncedOnTextChange(innerHTML);
      }
    },
    [
      debouncedOnTextChange,
      splitTextField,
      block.id,
      chainId,
      chainBlockIndex,
      fieldRefs,
      blockIndex,
      buildModifyFieldInnerHTMLAction,
      prevCaretPosition,
      setPrevCaretPosition,
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
      text={block.data.text}
      onInputChange={onInputChange}
      onKeyDown={handleKeyDown}
      data-block-type="header"
    />
  );
};
