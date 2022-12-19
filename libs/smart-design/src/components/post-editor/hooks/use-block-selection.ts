import { useContext, useState } from 'react';

import { useUpdateBlocks } from '../contexts/block-context';
import { BlockSelectionContext } from '../contexts/block-selection-context';

import { useRefs } from './use-refs';

export const useBlockSelection = () => {
  const {
    selectedBlocks,
    selectableBlocks,
    centerSelectedBlock,
    isSelectionEnabled,
    setCenterSelectedBlock,
    setSelectedBlocks,
    setIsSelectionEnabled,
  } = useContext(BlockSelectionContext);

  if (typeof isSelectionEnabled === undefined) {
    throw new Error(
      'useBlockSelection must be used within a BlockSelectionContext'
    );
  }

  const [prevRange, setPrevRange] = useState<Range | null>();
  const { refs } = useRefs();
  const { swapBlocks } = useUpdateBlocks();

  const handleShiftUp = (e: React.KeyboardEvent, blockIndex: number) => {
    console.log('handleShiftUp');

    // If some blocks are selected,
    // select the block above the first selected block
    // or deselect the last block
    if (selectedBlocks.length) {
      e.preventDefault();
      e.stopPropagation();
      document.getSelection()?.removeAllRanges();

      const centerSelectedBlockIndex =
        selectedBlocks.indexOf(centerSelectedBlock);

      if (centerSelectedBlockIndex === -1 || selectedBlocks[0] === 0) return;

      const newSelectedBlocks = [...selectedBlocks];

      if (centerSelectedBlockIndex > 0 || selectedBlocks.length === 1) {
        newSelectedBlocks.unshift(selectedBlocks[0] - 1);
      } else {
        newSelectedBlocks.pop();
      }

      setSelectedBlocks(newSelectedBlocks);
    }

    // If no blocks are selected,
    // selecte the current block the the one above
    else {
      const newRange = document.getSelection()?.getRangeAt(0);
      if (newRange === prevRange) {
        e.preventDefault();
        const newSelectedBlocks =
          blockIndex === 0 ? [blockIndex] : [blockIndex - 1, blockIndex];
        setSelectedBlocks(newSelectedBlocks);
        setCenterSelectedBlock(blockIndex);
        setPrevRange(null);
        document.getSelection()?.removeAllRanges();
      } else {
        setPrevRange(newRange);
      }
    }
  };

  const handleShiftDown = (e: React.KeyboardEvent, blockIndex: number) => {
    console.log('handleShiftDown');
    // If some blocks are selected,
    // select the block above the first selected block
    // or deselect the last block
    if (selectedBlocks.length) {
      e.preventDefault();
      document.getSelection()?.removeAllRanges();

      const centerSelectedBlockIndex =
        selectedBlocks.indexOf(centerSelectedBlock);

      if (
        centerSelectedBlockIndex === -1 ||
        selectedBlocks[selectedBlocks.length - 1] ===
          selectableBlocks.current.length - 1
      )
        return;

      const newSelectedBlocks = [...selectedBlocks];

      if (centerSelectedBlockIndex <= 0 || selectedBlocks.length === 1) {
        newSelectedBlocks.push(selectedBlocks[selectedBlocks.length - 1] + 1);
      } else {
        newSelectedBlocks.shift();
      }

      setSelectedBlocks(newSelectedBlocks);
    }

    // If no blocks are selected,
    // selecte the current block the the one above
    else {
      const newRange = document.getSelection()?.getRangeAt(0);
      if (newRange === prevRange) {
        e.preventDefault();
        const newSelectedBlocks =
          blockIndex === refs.current.length - 1
            ? [blockIndex]
            : [blockIndex, blockIndex + 1];
        setSelectedBlocks(newSelectedBlocks);
        setCenterSelectedBlock(blockIndex);
        setPrevRange(null);
        document.getSelection()?.removeAllRanges();
      } else {
        setPrevRange(newRange);
      }
    }
  };

  const handleMetakeyArrowDown = async (e: React.KeyboardEvent) => {
    e.preventDefault();

    if (
      !selectedBlocks.length ||
      selectedBlocks[selectedBlocks.length - 1] ===
        selectableBlocks.current.length - 1
    )
      return;

    setSelectedBlocks([...selectedBlocks.map((i) => i + 1)]);
    setCenterSelectedBlock(
      (prevCenterSelectedBlock) => prevCenterSelectedBlock + 1
    );

    for (let i = selectedBlocks.length - 1; i >= 0; i--) {
      await swapBlocks(selectedBlocks[i], selectedBlocks[i] + 1);
    }
  };

  const handleMetakeyArrowUp = async (e: React.KeyboardEvent) => {
    e.preventDefault();

    if (!selectedBlocks.length || selectedBlocks[0] === 0) return;

    for (let i = 0; i < selectedBlocks.length; i++) {
      await swapBlocks(selectedBlocks[i], selectedBlocks[i] - 1);
    }
    setSelectedBlocks([...selectedBlocks.map((i) => i - 1)]);
    setCenterSelectedBlock(
      (prevCenterSelectedBlock) => prevCenterSelectedBlock - 1
    );
  };

  const handleTab = (e: React.KeyboardEvent, blockIndex: number) => {
    e.preventDefault();
    setSelectedBlocks([blockIndex]);
    setCenterSelectedBlock(blockIndex);
    document.getSelection()?.removeAllRanges();
  };

  const handleKeyboardBlockSelection = (
    e: React.KeyboardEvent,
    blockIndex: number
  ) => {
    if (e.shiftKey && e.key === 'ArrowUp') {
      handleShiftUp(e, blockIndex);
      return;
    }

    if (e.shiftKey && e.key === 'ArrowDown') {
      handleShiftDown(e, blockIndex);
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowUp') {
      handleMetakeyArrowUp(e);
      console.log('end');
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowDown') {
      handleMetakeyArrowDown(e);
      return;
    }

    if (e.key === 'Tab') {
      handleTab(e, blockIndex);
    }
  };

  return {
    selectedBlocks,
    selectableBlocks,
    centerSelectedBlock,
    isSelectionEnabled,
    setCenterSelectedBlock,
    setSelectedBlocks,
    setIsSelectionEnabled,
    handleKeyboardBlockSelection,
  };
};
