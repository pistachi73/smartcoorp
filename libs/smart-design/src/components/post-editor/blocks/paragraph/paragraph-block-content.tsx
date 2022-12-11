import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components';

import { spaceS } from '../../../../tokens/spacing';
import { Body } from '../../../body';
import { useUpdateBlocks } from '../../contexts/block-context';
import { useRefs } from '../../contexts/refs-context';
import { useUpdateTool } from '../../contexts/tool-context';
import { getCaretPosition, getElementTextContent } from '../../helpers';
import { useBlockEdit } from '../../hooks/use-block-edit';
import { useBlockNavigation } from '../../hooks/use-block-navigation';
import { ParagraphBlockProps } from '../../post-editor.types';

const StyledBody = styled(Body)`
  width: 100%;
  min-height: 24px;
  padding: ${spaceS} 0;

  :focus {
    outline: none;
  }
`;
type ParagraphBlockContentProps = {
  blockIndex: number;
  block: ParagraphBlockProps;
};

export const ParagraphBlockContent = memo<ParagraphBlockContentProps>(
  ({ blockIndex, block }) => {
    const [initialText] = useState(block.data.text);
    const setTool = useUpdateTool();
    const { refs, focusBlockByIndex } = useRefs();
    const { setBlocks, splitTextBlock } = useUpdateBlocks();
    const { handleBlockNavigation } = useBlockNavigation(blockIndex);
    const { removeBlockAndFocusPrevious } = useBlockEdit(blockIndex);

    const updateParagraphText = useCallback(() => {
      setBlocks((blocks) => {
        const newBlocks = [...blocks];
        (newBlocks[blockIndex] as ParagraphBlockProps).data.text =
          refs.current[blockIndex].innerHTML;
        return newBlocks;
      });
      setTool(null);
    }, [blockIndex, refs, setBlocks, setTool]);

    const onBlockChange = useCallback(async () => {
      const element = refs.current[blockIndex];
      const innerHTML = element.innerHTML;

      if (innerHTML.includes('<div>')) {
        console.log('Splitting block');
        await splitTextBlock(blockIndex, innerHTML);
      } else {
        await updateParagraphText();
      }
    }, [blockIndex, refs, updateParagraphText, splitTextBlock]);

    const handleKeyDown = useCallback(
      async (e: React.KeyboardEvent) => {
        const element = refs.current[blockIndex];
        const caretPosition = getCaretPosition(element);
        if (e.key === 'Backspace') {
          if (caretPosition === 0 && element.textContent.length === 0) {
            console.log('Hola');
            e.preventDefault();
            await removeBlockAndFocusPrevious();
            return;
          }

          // Merge with previous block
          if (caretPosition === 0 && element.textContent.length !== 0) {
            console.log('merge paragraph block with previous block');
            let previousBlockTextContentLength: number | null = null;
            let newHTML = '';

            await setBlocks((prevBlocks) => {
              if (
                blockIndex !== 0 &&
                prevBlocks[blockIndex - 1].type === 'paragraph'
              ) {
                e.preventDefault();
                const newBlocks = [...prevBlocks];

                newHTML = element.innerHTML;
                previousBlockTextContentLength = getElementTextContent(
                  refs.current[blockIndex - 1]
                ).length;

                newBlocks.splice(blockIndex, 1);

                return newBlocks;
              } else return prevBlocks;
            });

            if (previousBlockTextContentLength !== null) {
              console.log(previousBlockTextContentLength);
              focusBlockByIndex(blockIndex - 1, 'end');
              await document.execCommand('insertHTML', false, newHTML);
              focusBlockByIndex(blockIndex - 1, previousBlockTextContentLength);
              return;
            }
          }
        }

        handleBlockNavigation(e);
      },
      [
        blockIndex,
        refs,
        removeBlockAndFocusPrevious,
        setBlocks,
        focusBlockByIndex,
        handleBlockNavigation,
      ]
    );

    return (
      <StyledBody
        ref={(el: HTMLElement) => (refs.current[blockIndex] = el)}
        id={block.id}
        className="paragraph-block"
        noMargin
        onInput={onBlockChange}
        onKeyDown={handleKeyDown}
        contentEditable={true}
        suppressContentEditableWarning={true}
        dangerouslySetInnerHTML={{ __html: initialText }}
      />
    );
  }
);
