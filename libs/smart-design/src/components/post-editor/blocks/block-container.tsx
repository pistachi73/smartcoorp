import { useCallback, useEffect } from 'react';
import * as React from 'react';

import { useBlockSelectionConsumerContext } from '../contexts/block-selection-context/block-selection-context';
import { useRefsContext } from '../contexts/refs-context';
import { useUpdateTool } from '../contexts/tool-context';
import { useBlockSelection } from '../hooks';
import { useBlockNavigation } from '../hooks/use-block-navigation';
import {
  BlockContent,
  BlockContainer as StyledBlockContainer,
} from '../post-editor.styles';

import type { BlockContainerProps } from './blocks.types';

export const BlockContainer = ({
  blockIndex,
  chainBlockIndex,
  blockId,
  chainId,
  blockType,
  children,
}: BlockContainerProps) => {
  const setTool = useUpdateTool();
  //const { isMenuOpened } = useBlockMenu();
  const { handleKeyboardBlockNavigation } = useBlockNavigation(blockIndex);
  const { handleKeyboardBlockSelection } = useBlockSelection();
  const { selectedBlocks } = useBlockSelectionConsumerContext();
  const {
    blockRefs,
    fieldRefs,
    addBlockRef,
    handlePrevTextSelectionOnMouseUp,
    handlePrevTextSelectionOnKeyUp,
  } = useRefsContext();

  useEffect(() => {
    return () => {
      blockRefs.current = blockRefs.current.filter((ref) => ref !== null);
      fieldRefs.current = fieldRefs.current.filter(
        (refs) => refs.filter((ref) => ref !== null).length > 0
      );
    };
  }, [blockRefs, fieldRefs]);

  // const handleSetTool = useCallback(() => {
  //   if (!isMenuOpened)
  //     setTool({
  //       blockIndex,
  //       type: blockType,
  //     });
  // }, [blockIndex, blockType, isMenuOpened, setTool]);

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      handlePrevTextSelectionOnMouseUp(e);
      //handleSetTool();
    },
    [handlePrevTextSelectionOnMouseUp]
  );

  const handleKeyDown = useCallback(
    (blockIndex: number, chainBlockIndex: number, chainId: string) =>
      (e: React.KeyboardEvent) => {
        handleKeyboardBlockSelection(e, blockIndex, chainBlockIndex, chainId);
        handleKeyboardBlockNavigation(e);
      },
    [handleKeyboardBlockNavigation, handleKeyboardBlockSelection]
  );

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      handlePrevTextSelectionOnKeyUp(e);
    },
    [handlePrevTextSelectionOnKeyUp]
  );

  return (
    <StyledBlockContainer
      ref={addBlockRef(blockIndex)}
      onMouseUp={handleMouseUp}
      // onMouseEnter={handleSetTool}
      onKeyDown={handleKeyDown(blockIndex, chainBlockIndex, chainId)}
      onKeyUp={handleKeyUp}
      data-block-id={blockId}
      data-chain-id={chainId}
      data-block-index={blockIndex}
      data-chain-block-index={chainBlockIndex}
    >
      <BlockContent $selected={selectedBlocks.includes(blockIndex)}>
        {children}
      </BlockContent>
    </StyledBlockContainer>
  );
};
