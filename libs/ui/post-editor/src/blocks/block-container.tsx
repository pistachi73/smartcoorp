import { useCallback, useEffect } from 'react';
import * as React from 'react';

import { gray900, gray900_RGBA } from '@smartcoorp/ui/tokens';

import { useBlockSelectionConsumerContext } from '../contexts/block-selection-context/block-selection-context';
import { useRefsContext } from '../contexts/refs-context';
import {
  useToolBlockIndexUpdaterContext,
  useToolControlUpdaterContext,
} from '../contexts/tool-control-context/tool-control-context';
import { useUtilContext } from '../contexts/util-context';
import { useBlockSelection } from '../hooks';
import { useBlockNavigation } from '../hooks/use-block-navigation';
import {
  BlockContent,
  BlockContainer as StyledBlockContainer,
  ViewIdTag,
} from '../post-editor.styles';

import type { BlockContainerProps } from './blocks.types';

export const BlockContainer = ({
  blockIndex,
  chainBlockIndex,
  blockId,
  chainId,
  blockType,
  children,
  chainLength,
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
    handlePrevTextSelectionOnFocus,
    handlePrevTextSelectionOnKeyUp,
  } = useRefsContext();

  const { viewBlocks } = useUtilContext();

  useEffect(() => {
    return () => {
      blockRefs.current = blockRefs.current.filter((ref) => ref !== null);
      fieldRefs.current = fieldRefs.current.filter(
        (refs) => refs.filter((ref) => ref !== null).length > 0
      );
    };
  }, [blockRefs, fieldRefs, blockIndex]);

  const handleSetTool = useCallback(
    (e: React.MouseEvent | React.FocusEvent) => {
      setToolBlockIndex((currentIndex) =>
        currentIndex === -1 ? null : blockIndex
      );
    },
    [blockIndex, setToolBlockIndex]
  );

  const handleFocus = useCallback(
    (e: React.MouseEvent | React.FocusEvent) => {
      handlePrevTextSelectionOnFocus(e);
      handleSetTool(e);
    },
    [handlePrevTextSelectionOnFocus, handleSetTool]
  );

  const handleKeyDown = useCallback(
    (blockIndex: number, chainBlockIndex: number, chainId: string) =>
      (e: React.KeyboardEvent) => {
        handleKeyboardBlockSelection(e, blockIndex, chainBlockIndex, chainId);
        handleKeyboardBlockNavigation(e);

        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
          e.preventDefault();
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

  const isSelected = React.useMemo(
    () => selectedBlocks.includes(blockIndex),
    [selectedBlocks, blockIndex]
  );

  return (
    <StyledBlockContainer
      ref={addBlockRef(blockIndex)}
      onMouseUp={handleFocus}
      onFocus={handleFocus}
      onMouseEnter={handleSetTool}
      onKeyDown={handleKeyDown(blockIndex, chainBlockIndex, chainId)}
      onKeyUp={handleKeyUp}
      data-block-type={blockType}
      data-block-id={blockId}
      data-chain-id={chainId}
      data-block-index={blockIndex}
      data-block-selected={isSelected}
      data-chain-block-index={chainBlockIndex}
      data-chain-length={chainLength}
    >
      <BlockContent $selected={isSelected} $viewBlocks={viewBlocks}>
        {viewBlocks && (
          <ViewIdTag $position="right">
            <b>Id:</b> {blockId}
          </ViewIdTag>
        )}
        {children}
      </BlockContent>
    </StyledBlockContainer>
  );
};
