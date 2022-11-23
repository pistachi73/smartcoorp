import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components';

import { spaceS } from '../../../../tokens/spacing';
import { Body } from '../../../body';
import { useUpdateBlocks } from '../../contexts/block-context';
import { useRefs } from '../../contexts/refs-context';
import { useUpdateTool } from '../../contexts/tool-context';
import {
  getCaretPosition,
  getElementTextContent,
  setCaretPosition,
} from '../../helpers';
import { useBlockNavigation } from '../../hooks/use-block-navigation';
import { BlockContent } from '../../post-editor.styles';
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
    const { refs, focusPreviousBlock } = useRefs();
    const { setBlocks, removeBlock, splitTextBlock } = useUpdateBlocks();
    const { handleBlockNavigation } = useBlockNavigation(blockIndex);

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
        await splitTextBlock(blockIndex, innerHTML);
      } else {
        await updateParagraphText();
      }
    }, [blockIndex, refs, updateParagraphText, splitTextBlock]);

    const handleKeyDown = useCallback(
      async (e: React.KeyboardEvent) => {
        if (e.key === 'Backspace') {
          const element = refs.current[blockIndex];
          const caretPosition = getCaretPosition(element);

          if (caretPosition === 0 && element.textContent.length === 0) {
            e.preventDefault();
            await removeBlock(blockIndex);
            focusPreviousBlock(blockIndex);
            refs.current.pop();
            setTool(null);
            return;
          }

          // Merge with previous block
          if (caretPosition === 0 && element.textContent.length !== 0) {
            console.log('merge paragraph block with previous block');
            let previousBlockTextContentLength = null;
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
              focusPreviousBlock(blockIndex);
              document.execCommand('insertHTML', false, newHTML);

              setCaretPosition({
                element: refs.current[blockIndex - 1],
                position: previousBlockTextContentLength,
              });

              return;
            }
          }
        }

        handleBlockNavigation(e);
      },
      [
        blockIndex,
        refs,
        removeBlock,
        setBlocks,
        handleBlockNavigation,
        focusPreviousBlock,
      ]
    );

    return (
      <BlockContent>
        <StyledBody
          ref={(el: any) => (refs.current[blockIndex] = el)}
          id={block.id}
          className="paragraph-block"
          noMargin
          onInput={onBlockChange}
          onKeyDown={handleKeyDown}
          contentEditable={true}
          suppressContentEditableWarning={true}
          dangerouslySetInnerHTML={{ __html: initialText }}
        />
      </BlockContent>
    );
  }
);
