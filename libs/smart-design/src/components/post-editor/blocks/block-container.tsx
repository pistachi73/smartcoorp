import { useEffect, useRef } from 'react';

import { useBlockMenu } from '../contexts/block-menu-tool-context';
import { useUpdateTool } from '../contexts/tool-context';
import { useBlockSelection } from '../hooks';
import { useBlockNavigation } from '../hooks/use-block-navigation';
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
  const { handleKeyboardBlockNavigation } = useBlockNavigation(blockIndex);
  const { selectedBlocks, selectableBlocks, handleKeyboardBlockSelection } =
    useBlockSelection();

  const handleSetTool = () => {
    if (!isMenuOpened)
      setTool({
        blockIndex,
        type: blockType,
      });
  };

  useEffect(() => {
    if (!blockRef.current) return;
    const { left, top, width, height } =
      blockRef.current.getBoundingClientRect();
    selectableBlocks.current.push({ left, top, width, height });
  }, [selectableBlocks]);

  const handleKeyDown = (blockIndex: number) => (e: React.KeyboardEvent) => {
    handleKeyboardBlockSelection(e, blockIndex);
    handleKeyboardBlockNavigation(e);
  };

  return (
    <StyledBlockContainer
      ref={blockRef}
      onMouseUp={handleSetTool}
      onMouseEnter={handleSetTool}
      onKeyDown={handleKeyDown(blockIndex)}
    >
      <BlockContent $selected={selectedBlocks.includes(blockIndex)}>
        {children}
      </BlockContent>
    </StyledBlockContainer>
  );
};
