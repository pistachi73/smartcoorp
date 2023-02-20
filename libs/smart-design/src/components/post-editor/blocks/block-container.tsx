import { useCallback, useEffect } from 'react';
import * as React from 'react';

import { useBlockSelectionConsumerContext } from '../contexts/block-selection-context/block-selection-context';
import { useRefsContext } from '../contexts/refs-context';
import {
  useToolBlockIndexUpdaterContext,
  useToolControlUpdaterContext,
} from '../contexts/tool-control-context/tool-control-context';
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
  chainLevel,
  blockType,
  children,
  chainLength,
  parentChainId,
}: BlockContainerProps) => {
  const setToolBlockIndex = useToolBlockIndexUpdaterContext();
  const { handleKeyboardBlockNavigation } = useBlockNavigation(blockIndex);
  const { handleKeyboardBlockSelection } = useBlockSelection();
  const { setIsAddBlockMenuOpened } = useToolControlUpdaterContext();
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
  }, [blockRefs, fieldRefs, blockIndex]);

  const handleSetTool = useCallback(
    (e: React.MouseEvent) => {
      setToolBlockIndex((currentIndex) =>
        currentIndex === -1 ? null : blockIndex
      );
    },
    [blockIndex, setToolBlockIndex]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      handlePrevTextSelectionOnMouseUp(e);
      handleSetTool(e);
    },
    [handlePrevTextSelectionOnMouseUp, handleSetTool]
  );

  const handleKeyDown = useCallback(
    (blockIndex: number, chainBlockIndex: number, chainId: string) =>
      (e: React.KeyboardEvent) => {
        handleKeyboardBlockSelection(e, blockIndex, chainBlockIndex, chainId);
        handleKeyboardBlockNavigation(e);

        if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
          e.preventDefault();
          console.log('command i');
          setToolBlockIndex(blockIndex);
          setIsAddBlockMenuOpened(true);
        }
      },
    [
      handleKeyboardBlockNavigation,
      handleKeyboardBlockSelection,
      setIsAddBlockMenuOpened,
      setToolBlockIndex,
    ]
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
      onMouseEnter={handleSetTool}
      onKeyDown={handleKeyDown(blockIndex, chainBlockIndex, chainId)}
      onKeyUp={handleKeyUp}
      data-block-type={blockType}
      data-block-id={blockId}
      data-chain-id={chainId}
      data-chain-level={chainLevel}
      data-block-index={blockIndex}
      data-chain-block-index={chainBlockIndex}
      data-chain-length={chainLength}
      data-parent-chain-id={parentChainId}
    >
      <BlockContent $selected={selectedBlocks.includes(blockIndex)}>
        {children}
      </BlockContent>
    </StyledBlockContainer>
  );
};
