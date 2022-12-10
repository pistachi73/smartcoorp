import { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { spaceS } from '../../../../tokens/spacing';
import { Headline } from '../../../headline';
import { useUpdateBlocks } from '../../contexts/block-context';
import { useRefs } from '../../contexts/refs-context';
import { useUpdateTool } from '../../contexts/tool-context';
import { getCaretPosition } from '../../helpers';
import { useBlockNavigation } from '../../hooks';
import { useBlockEdit } from '../../hooks/use-block-edit';
import { BlockContent } from '../../post-editor.styles';
import { HeaderBlockProps } from '../../post-editor.types';

const StyledHeadline = styled(Headline)`
  display: block;
  padding: ${spaceS} 0;

  :focus {
    outline: none;
  }
  :empty:before {
    content: attr(data-placeholder);
    color: ${({ theme }) => theme.common.overBackgroundNeutral};
  }
`;
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
  level: number;
};

export const HeaderBlockContent = memo<HeaderBlockContentProps>(
  ({ blockIndex, block, level }) => {
    const [initialText, setInitialText] = useState(block.data.text);
    const { refs } = useRefs();
    const { setBlocks, splitTextBlock } = useUpdateBlocks();
    const { removeBlockAndFocusPrevious } = useBlockEdit(blockIndex);
    const setTool = useUpdateTool();
    const { handleBlockNavigation } = useBlockNavigation(blockIndex);
    const size = HEADLINE_SIZE_LEVELS[block.data.level];

    useEffect(() => {
      setInitialText(block.data.text);
    }, [level, block]);

    const updateHeaderText = useCallback(() => {
      setBlocks((blocks) => {
        const newBlocks = [...blocks];
        (newBlocks[blockIndex] as HeaderBlockProps).data.text =
          refs.current[blockIndex].innerHTML;
        return newBlocks;
      });
      setTool(null);
    }, [blockIndex, refs, setBlocks, setTool]);

    const onBlockChange = async () => {
      const element = refs.current[blockIndex];
      const innerHTML = element.innerHTML;
      if (innerHTML.includes('<div>')) {
        await splitTextBlock(blockIndex, innerHTML);
        setTool({
          type: 'paragraph',
          blockIndex: blockIndex + 1,
        });
      } else await updateHeaderText();
    };

    const handleKeyDown = async (e: React.KeyboardEvent) => {
      if (e.key === 'Backspace') {
        const element = refs.current[blockIndex];
        const caretPosition = getCaretPosition(element);

        if (caretPosition === 0 && element.textContent.length === 0) {
          e.preventDefault();
          await removeBlockAndFocusPrevious();
          return;
        }
      }

      handleBlockNavigation(e);
    };

    return (
      <BlockContent>
        <StyledHeadline
          ref={(el: HTMLElement) => (refs.current[blockIndex] = el)}
          id={block.id}
          size={size}
          noMargin
          forwardedAs={`h${block.data.level}`}
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
