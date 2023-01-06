import debounce from 'lodash.debounce';
import React, { useCallback, useMemo, useRef } from 'react';
import { v4 as uuid } from 'uuid';

import { useBlockUpdaterContext } from '../../contexts/block-context';
import { TextField } from '../../fields/text-field';
import { getCaretPosition, getElementTextContent } from '../../helpers';
import { updateBlocks } from '../../helpers/fp-helpers';
import { useBlockEdit, useCommands, useRefs } from '../../hooks';
import { useDispatchAsyncCommand } from '../../hooks/use-commands/use-dispatch-async-commands';
import { usePreviousPersistentWithMatcher } from '../../hooks/use-previous';
import { ParagraphBlockProps } from '../../post-editor.types';

type ParagraphBlockContentProps = {
  blockIndex: number;
  block: ParagraphBlockProps;
};

export const ParagraphBlockContent: React.FC<ParagraphBlockContentProps> = ({
  blockIndex,
  block,
}) => {
  const { focusableRefs, focusContiguousElement } = useRefs();
  const { setBlocks, splitTextBlock, updateBlockFields } = useBlockUpdaterContext();
  const { addCommand } = useCommands();
  const prevText = usePreviousPersistentWithMatcher(block.data.text);
  const { dispatchAsyncCommand } = useDispatchAsyncCommand(block.data.text, prevText);

  const focusIndex = 0;
  const onTextChange = useCallback(
    (text: string) => {
      updateBlockFields(blockIndex, {
        text,
      });

      dispatchAsyncCommand({
        type: 'editTextField',
        field: 'text',
        ref: focusableRefs.current[blockIndex][0],
        blockIndex,
        fieldId: `${block.id}_${focusIndex}`,
      });
    },
    [updateBlockFields, blockIndex, dispatchAsyncCommand, focusableRefs, block.id]
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

        const { newBlockId, textAfter } = await splitTextBlock(
          blockIndex,
          innerHTML,
          focusableRefs.current[blockIndex][0]
        );

        dispatchAsyncCommand({
          type: 'splitTextBlock',
          blockIndex,
          fieldId: `${block.id}_${focusIndex}`,
          field: 'text',
          ref: focusableRefs.current[blockIndex][0],
          createdParagraphBlock: {
            text: textAfter,
            id: newBlockId,
          },
        });
      } else {
        debouncedOnTextChange(innerHTML);
      }
    },
    [
      debouncedOnTextChange,
      splitTextBlock,
      blockIndex,
      focusableRefs,
      dispatchAsyncCommand,
      block.id,
    ]
  );

  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent) => {
      const element = e.target as HTMLElement;
      const caretPosition = getCaretPosition(element);
      if (e.key === 'Backspace') {
        if (
          caretPosition === 0 &&
          focusableRefs.current[blockIndex - 1][0].getAttribute('data-block-type') === 'paragraph'
        ) {
          debouncedOnTextChange.cancel();
          e.preventDefault();
          e.stopPropagation();
          const prevBlock = focusableRefs.current[blockIndex - 1][0];
          const prevBlockInnerHTML = prevBlock.innerHTML;
          const prevBlockTextContentLength: number = getElementTextContent(prevBlock).length;
          const newHTML = `${prevBlockInnerHTML}${element.innerHTML}`.trim();

          setBlocks(
            updateBlocks({
              [blockIndex - 1]: {
                data: {
                  $merge: {
                    text: newHTML,
                  },
                },
              },
              $splice: [[blockIndex, 1]],
            })
          );

          prevBlock.innerHTML = newHTML;
          focusContiguousElement(blockIndex, 0, -1, prevBlockTextContentLength);

          addCommand({
            action: {
              type: 'mergeTextBlock',
              payload: {
                fieldId: prevBlock.id,
                blockIndex: blockIndex - 1,
                field: 'text',
                ref: focusableRefs.current[blockIndex - 1][0],
                text: newHTML,
                caretPosition: prevBlockTextContentLength,
              },
            },
            inverse: {
              type: 'splitTextBlock',
              payload: {
                fieldId: prevBlock.id,
                blockIndex: blockIndex - 1,
                field: 'text',
                ref: focusableRefs.current[blockIndex - 1][0],
                text: prevBlockInnerHTML,
                createdBlock: {
                  id: block.id,
                  type: 'paragraph',
                  data: {
                    text: block.data.text,
                  },
                },
              },
            },
          });
        }
      }
    },
    [
      focusableRefs,
      blockIndex,
      debouncedOnTextChange,
      setBlocks,
      focusContiguousElement,
      addCommand,
      block.id,
      block.data.text,
    ]
  );

  return (
    <TextField
      variant="paragraph"
      field="text"
      blockId={block.id}
      blockIndex={blockIndex}
      focusIndex={focusIndex}
      text={block.data.text}
      onInputChange={onInputChange}
      onKeyDown={handleKeyDown}
      data-block-type="paragraph"
    />
  );
};
