import debounce from 'lodash.debounce';
import React, { useCallback, useMemo } from 'react';

import { useBlocksDBUpdaterContext } from '../../contexts/blocks-context';
import { useRefsContext } from '../../contexts/refs-context';
import { TextField } from '../../fields/text-field';
import {
  getBlockContainerAttributes,
  getCaretPosition,
  getElementTextContent,
} from '../../helpers';
import type { ParagraphBlockContentProps } from '../blocks.types';

export const ParagraphBlockContent: React.FC<ParagraphBlockContentProps> = ({
  blockIndex,
  chainBlockIndex,
  chainId,
  block,
}) => {
  const {
    setFieldValue,
    removeBlocks,
    splitTextField,
    mergeTextFields,
    buildModifyFieldInnerHTMLAction,
    buildFocusFieldAction,
  } = useBlocksDBUpdaterContext();

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

      setFieldValue({
        blockId: block.id,
        blockType: 'paragraph',
        field: 'text',
        value: text,
        undo: buildModifyFieldInnerHTMLAction({
          fieldId,
          caretPosition: prevCaretPosition.current,
        }),
        redo: buildModifyFieldInnerHTMLAction({
          fieldId,
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
      fieldId,
      prevCaretPosition,
      setPrevCaretPosition,
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

        splitTextField({
          blockType: 'paragraph',
          blockId: block.id,
          chainId,
          field: 'text',
          chainBlockIndex,
          innerHTML,
          splitedBlockRef: fieldRefs.current[blockIndex][0],
          undo: buildModifyFieldInnerHTMLAction({
            fieldId,
            caretPosition: prevCaretPosition.current,
          }),
          redo: buildModifyFieldInnerHTMLAction({
            fieldId,
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
      fieldId,
      prevCaretPosition,
      setPrevCaretPosition,
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

          mergeTextFields({
            blockType: 'paragraph',
            mergedField: 'text',
            mergedFieldRef: prevFieldRef,
            mergedBlockRef: prevBlock,
            removedInnerHTML: element.innerHTML,
            removedChainBlockIndex: chainBlockIndex,
            removedChainId: chainId,
            undo: buildModifyFieldInnerHTMLAction({
              fieldId: prevFieldRef.id,
              focusFieldId: fieldId,
              caretPosition: prevCaretPosition.current,
            }),
            redo: buildModifyFieldInnerHTMLAction({
              fieldId: prevFieldRef.id,
              caretPosition: prevFieldContentLength,
            }),
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
      removeBlocks,
      block.id,
      chainId,
      buildFocusFieldAction,
      prevCaretPosition,
      focusField,
      mergeTextFields,
      chainBlockIndex,
      buildModifyFieldInnerHTMLAction,
      fieldId,
      setPrevCaretPosition,
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
