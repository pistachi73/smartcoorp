import { useRef } from 'react';

import { useBlockMenu } from '../contexts/block-menu-tool-context';
import { useUpdateTool } from '../contexts/tool-context';
import {
  BlockContent,
  BlockContainer as StyledBlockContainer,
} from '../post-editor.styles';
import { BlockType } from '../post-editor.types';

type BlockContainerProps = {
  blockIndex: number;
  blockType: BlockType;
  children: React.ReactNode;
};

export const BlockContainer = ({
  blockIndex,
  children,
  blockType,
}: BlockContainerProps) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const setTool = useUpdateTool();
  const { isMenuOpened } = useBlockMenu();

  const handleSetTool = () => {
    if (!isMenuOpened)
      setTool({
        blockIndex,
        type: blockType,
      });
  };

  return (
    <StyledBlockContainer
      ref={blockRef}
      onMouseUp={handleSetTool}
      onMouseEnter={handleSetTool}
    >
      <BlockContent>{children}</BlockContent>
    </StyledBlockContainer>
  );
};
