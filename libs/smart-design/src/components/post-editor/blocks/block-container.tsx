import { useEffect } from 'react';
import * as React from 'react';

import { useBlockMenu } from '../contexts/block-menu-tool-context';
import { useBlockSelectionConsumerContext } from '../contexts/block-selection-context';
import { useUpdateTool } from '../contexts/tool-context';
import { useBlockSelection, useRefs } from '../hooks';
import { useBlockNavigation } from '../hooks/use-block-navigation';
import { BlockContent, BlockContainer as StyledBlockContainer } from '../post-editor.styles';
import { BlockType } from '../post-editor.types';

type BlockContainerProps = {
  blockIndex: number;
  blockType: BlockType;
  children: React.ReactNode;
};

export const BlockContainer = ({ blockIndex, blockType, children }: BlockContainerProps) => {
  const setTool = useUpdateTool();
  const { isMenuOpened } = useBlockMenu();
  const { handleKeyboardBlockNavigation } = useBlockNavigation(blockIndex);
  const { handleKeyboardBlockSelection } = useBlockSelection();
  const { selectedBlocks } = useBlockSelectionConsumerContext();
  const {
    blockRefs,
    focusableRefs,
    flatenFocusableRefs,
    addBlockRef,
    handlePrevTextSelectionOnMouseUp,
    handlePrevTextSelectionOnKeyUp,
  } = useRefs();

  useEffect(() => {
    return () => {
      blockRefs.current = blockRefs.current.filter((ref) => ref !== null);
      focusableRefs.current = focusableRefs.current.filter(
        (refs) => refs.filter((ref) => ref !== null).length > 0
      );
      flatenFocusableRefs.current = focusableRefs.current.flat();
    };
  }, [blockRefs, flatenFocusableRefs, focusableRefs]);

  const handleSetTool = () => {
    if (!isMenuOpened)
      setTool({
        blockIndex,
        type: blockType,
      });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    handlePrevTextSelectionOnMouseUp(e);
    handleSetTool();
  };

  const handleKeyDown = (blockIndex: number) => (e: React.KeyboardEvent) => {
    console.log('handleKeyDown blockConainer', blockIndex);
    handleKeyboardBlockSelection(e, blockIndex);
    handleKeyboardBlockNavigation(e);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    handlePrevTextSelectionOnKeyUp(e);
  };
  return (
    <StyledBlockContainer
      ref={addBlockRef(blockIndex)}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleSetTool}
      onKeyDown={handleKeyDown(blockIndex)}
      onKeyUp={handleKeyUp}
    >
      <BlockContent $selected={selectedBlocks.includes(blockIndex)}>{children}</BlockContent>
    </StyledBlockContainer>
  );
};
