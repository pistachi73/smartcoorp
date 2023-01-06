import debounce from 'lodash.debounce';
import React, { useCallback, useMemo } from 'react';

import { useBlockUpdaterContext } from '../../contexts/block-context';
import { TextField } from '../../fields/text-field';
import { debounceDelay, getCaretPosition, getElementTextContent } from '../../helpers';
import { useBlockEdit, useCommands, usePreviousPersistentWithMatcher, useRefs } from '../../hooks';
import { useDispatchAsyncCommand } from '../../hooks/use-commands/use-dispatch-async-commands';
import { HeaderBlockProps } from '../../post-editor.types';

const HEADLINE_SIZE_LEVELS = {
  1: 'xxxlarge',
  2: 'xxlarge',
  3: 'xlarge',
  4: 'large',
  5: 'medium',
  6: 'small',
} as const;

type HeaderBlockContentProps = {
  blockIndex: number;
  block: HeaderBlockProps;
};

export const HeaderBlockContent: React.FC<HeaderBlockContentProps> = ({ blockIndex, block }) => {
  const { focusableRefs, focusContiguousElement } = useRefs();
  const { splitTextBlock, updateBlockFields, removeBlocks } = useBlockUpdaterContext();
  const { addCommand } = useCommands();
  const prevText = usePreviousPersistentWithMatcher(block.data.text);
  const { dispatchAsyncCommand } = useDispatchAsyncCommand(block.data.text, prevText);

  const size = useMemo(() => HEADLINE_SIZE_LEVELS[block.data.level], [block.data.level]);
  const focusIndex = useMemo(() => 0, []);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      const element = e.target as HTMLElement;
      const caretPosition = getCaretPosition(element);

      if (caretPosition === 0 && element.textContent?.length === 0) {
        e.preventDefault();
        e.stopPropagation();
        debouncedOnTextChange.cancel();
        removeBlocks([blockIndex]);
        focusContiguousElement(blockIndex, 0, -1);
        const prevBlock =
          focusableRefs.current[blockIndex - 1][focusableRefs.current[blockIndex - 1].length - 1];
        const prevBlockInnerHTML = prevBlock.innerHTML;
        const prevBlockTextContentLength: number = getElementTextContent(prevBlock).length;
        const newHTML = `${prevBlockInnerHTML}`.trim();

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
                type: 'header',
                data: {
                  level: block.data.level,
                  text: block.data.text,
                },
              },
            },
          },
        });
      }
    }
  };

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
    [updateBlockFields, blockIndex, dispatchAsyncCommand, focusableRefs, block.id, focusIndex]
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
      focusIndex,
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
      focusIndex={focusIndex}
      text={block.data.text}
      onInputChange={onInputChange}
      onKeyDown={handleKeyDown}
      data-block-type="header"
    />
  );
};
