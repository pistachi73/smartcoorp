import React, { FC, useEffect, useRef, useState } from 'react';

import { useBlockMenu } from '../../contexts/block-menu-tool-context';
import { useUpdateTool } from '../../contexts/tool-context';
import { BlockContainer } from '../../post-editor.styles';
import { HeaderBlockProps } from '../../post-editor.types';

import { HeaderBlockContent } from './header-block-content';

export const HeaderBlock: FC<{
  blockIndex: number;
  block: HeaderBlockProps;
}> = ({ blockIndex, block }) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const setTool = useUpdateTool();
  const { isMenuOpened } = useBlockMenu();

  const handleSetTool = () => {
    if (!isMenuOpened)
      setTool({
        blockIndex,
        type: 'header',
      });
  };

  return (
    <BlockContainer
      ref={blockRef}
      onMouseUp={handleSetTool}
      onMouseEnter={handleSetTool}
    >
      <HeaderBlockContent
        blockIndex={blockIndex}
        block={block}
        level={block.data.level}
      />
    </BlockContainer>
  );
};
