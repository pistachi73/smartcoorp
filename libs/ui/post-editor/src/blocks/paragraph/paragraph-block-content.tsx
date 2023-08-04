import debounce from 'lodash.debounce';
import React, { useCallback, useMemo } from 'react';

import { useBlocksDBUpdaterContext } from '../../contexts/blocks-context';
import { useDebounceContext } from '../../contexts/debounce-context/debounce-context';
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

  const { debounceTime } = useDebounceContext();

  const fieldIndex = 0;
  const fieldId = `${block.id}_${fieldIndex}`;

  const onTextChange = useCallback(
    (text: string) => {
      const currentCaretPosition = getCaretPosition(
        fieldRefs.current[blockIndex] ? fieldRefs.current[blockIndex][0] : null
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
    return debounce(onTextChange, debounceTime);
  }, [debounceTime, onTextChange]);

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

      if (
        e.key === 'Backspace' &&
        caretPosition === 0 &&
        document.querySelectorAll('[data-block-selected="true"]').length === 0
      ) {
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
          fieldRefs.current[blockIndex - 1] &&
          fieldRefs.current[blockIndex - 1][0].getAttribute(
            'data-field-type'
          ) === 'paragraph'
        ) {
          // Merge with previous paragraph block
          const scrollY = window.scrollY;
          debouncedOnTextChange.cancel();
          e.preventDefault();
          e.stopPropagation();

          const prevBlock = blockRefs.current[blockIndex - 1];
          const prevFieldRef = fieldRefs.current[blockIndex - 1][0];
          const prevFieldContentLength =
            getElementTextContent(prevFieldRef).length;

          /**
           * We need the await in order to succedd with the focusField action
           */
          await mergeTextFields({
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

          focusField([blockIndex - 1, 0], prevFieldContentLength);

          window.scrollTo(0, scrollY);
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
