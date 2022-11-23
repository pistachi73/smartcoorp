import React, { useRef } from 'react';

import { useBlockMenu } from '../../contexts/block-menu-tool-context';
import { useUpdateTool } from '../../contexts/tool-context';
import { BlockContainer } from '../../post-editor.styles';
import { ParagraphBlockProps } from '../../post-editor.types';

import { ParagraphBlockContent } from './paragraph-block-content';

export const ParagraphBlock = React.memo<{
  blockIndex: number;
  block: ParagraphBlockProps;
}>(({ blockIndex, block }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const setTool = useUpdateTool();
  const { isMenuOpened } = useBlockMenu();

  const handleSetTool = () => {
    if (!isMenuOpened)
      setTool({
        blockIndex,
        type: 'paragraph',
      });
  };

  return (
    <BlockContainer
      ref={blockRef}
      onMouseUp={handleSetTool}
      onMouseEnter={handleSetTool}
    >
      <ParagraphBlockContent blockIndex={blockIndex} block={block} />
    </BlockContainer>
  );
});
