import * as R from 'ramda';
import { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useBlockUpdaterContext } from '../contexts/block-context';
import {
  useBlockSelectionConsumerContext,
  useBlockSelectionUpdaterContext,
} from '../contexts/block-selection-context';
import { waitForElement } from '../helpers';
import { Block } from '../post-editor.types';

import { useCommands } from './use-commands/use-commands';
import { useRefs } from './use-refs';

export const useBlockSelection = () => {
  const [prevRange, setPrevRange] = useState<Range | null>();
  const { blockRefs, focusElement } = useRefs();

  const { swapBlocks } = useBlockUpdaterContext();
  const { removeBlocks, insertParagraphBlock, insertBlocks, getBlocksData } =
    useBlockUpdaterContext();
  const { selectedBlocks, clipboardBlocks, pivotSelectedBlock } =
    useBlockSelectionConsumerContext();
  const { setClipboardBlocks, setPivotSelectedBlock, setSelectedBlocks } =
    useBlockSelectionUpdaterContext();
  const { addCommand } = useCommands();

  const handleShiftUp = (e: React.KeyboardEvent, blockIndex: number) => {
    console.log('handleShiftUp');

    // If some blocks are selected,
    // select the block above the first selected block
    // or deselect the last block
    if (selectedBlocks.length) {
      e.preventDefault();
      e.stopPropagation();
      document.getSelection()?.removeAllRanges();

      const centerSelectedBlockIndex = selectedBlocks.indexOf(pivotSelectedBlock);

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
        const newSelectedBlocks = blockIndex === 0 ? [blockIndex] : [blockIndex - 1, blockIndex];
        setSelectedBlocks(newSelectedBlocks);
        setPivotSelectedBlock(blockIndex);
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

      const centerSelectedBlockIndex = selectedBlocks.indexOf(pivotSelectedBlock);

      if (
        centerSelectedBlockIndex === -1 ||
        selectedBlocks[selectedBlocks.length - 1] === blockRefs.current.length - 1
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
          blockIndex === blockRefs.current.length - 1 ? [blockIndex] : [blockIndex, blockIndex + 1];
        setSelectedBlocks(newSelectedBlocks);
        setPivotSelectedBlock(blockIndex);
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
      selectedBlocks[selectedBlocks.length - 1] === blockRefs.current.length - 1
    )
      return;

    setSelectedBlocks(R.map((x) => x + 1));

    setPivotSelectedBlock((prevCenterSelectedBlock) => prevCenterSelectedBlock + 1);

    const swapedBlocksIndexes: [number[], number[]] = [
      selectedBlocks,
      [selectedBlocks[selectedBlocks.length - 1] + 1],
    ];

    const inversedSwapedBlocksIndexes: [number[], number[]] = [
      swapedBlocksIndexes[0].map((x) => x + swapedBlocksIndexes[1].length),
      swapedBlocksIndexes[1].map((x) => x - swapedBlocksIndexes[0].length),
    ];
    swapBlocks(swapedBlocksIndexes[0], swapedBlocksIndexes[1]);

    addCommand({
      action: {
        type: 'swapBlocks',
        payload: {
          swapedBlocksIndexes,
          selectedBlocks: inversedSwapedBlocksIndexes[0],
        },
      },
      inverse: {
        type: 'swapBlocks',
        payload: {
          swapedBlocksIndexes: inversedSwapedBlocksIndexes,
          selectedBlocks: swapedBlocksIndexes[0],
        },
      },
    });
  };

  const handleMetakeyArrowUp = async (e: React.KeyboardEvent) => {
    e.preventDefault();

    if (!selectedBlocks.length || selectedBlocks[0] === 0) return;

    const swapedBlocksIndexes: [number[], number[]] = [selectedBlocks, [selectedBlocks[0] - 1]];

    // [[1, 2], [3]] -> [[1], [2, 3]]
    const inversedSwapedBlocksIndexes: [number[], number[]] = [
      swapedBlocksIndexes[0].map((x) => x - swapedBlocksIndexes[1].length),
      swapedBlocksIndexes[1].map((x) => x + swapedBlocksIndexes[0].length),
    ];
    swapBlocks(swapedBlocksIndexes[0], swapedBlocksIndexes[1]);

    setSelectedBlocks(R.map((x) => x - 1));
    setPivotSelectedBlock((prevCenterSelectedBlock) => prevCenterSelectedBlock - 1);

    addCommand({
      action: {
        type: 'swapBlocks',
        payload: {
          swapedBlocksIndexes,
          selectedBlocks: inversedSwapedBlocksIndexes[0],
        },
      },
      inverse: {
        type: 'swapBlocks',
        payload: {
          swapedBlocksIndexes: inversedSwapedBlocksIndexes,
          selectedBlocks: swapedBlocksIndexes[0],
        },
      },
    });
  };

  const handleMetakeyC = (e: React.KeyboardEvent) => {
    if (!selectedBlocks.length) {
      setClipboardBlocks([]);
      return;
    }

    e.preventDefault();
    const selectedBlocksData = getBlocksData(selectedBlocks);
    setClipboardBlocks(selectedBlocksData);
  };

  const handleMetakeyX = async (e: React.KeyboardEvent) => {
    if (!selectedBlocks.length) {
      setClipboardBlocks([]);
      return;
    }

    e.preventDefault();
    const firstSelectedBlockIndex = selectedBlocks[0];

    const removedBlocks = removeBlocks(selectedBlocks);
    const id = insertParagraphBlock(selectedBlocks[0] - 1);

    (await waitForElement(`${id}_0`))?.focus();
    setClipboardBlocks(removedBlocks);
    setSelectedBlocks([]);

    addCommand({
      action: {
        type: 'replaceBlocks',
        payload: {
          startingBlockIndex: firstSelectedBlockIndex,
          removedBlocksIndexes: selectedBlocks,
          addedBlocks: [{ type: 'paragraph', id, data: { text: '' } }],
          focusBlockIndex: firstSelectedBlockIndex,
        },
      },
      inverse: {
        type: 'replaceBlocks',
        payload: {
          startingBlockIndex: firstSelectedBlockIndex,
          removedBlocksIndexes: [firstSelectedBlockIndex],
          addedBlocks: removedBlocks,
          focusBlockIndex: pivotSelectedBlock,
        },
      },
    });
  };

  const handleMetakeyV = async (e: React.KeyboardEvent, blockIndex: number) => {
    if (!clipboardBlocks.length) return;

    e.preventDefault();

    // Change clipboardBlocks ids
    const formattedClipboardBlocks = clipboardBlocks.map((block) => ({
      ...block,
      id: uuid(),
    }));

    const firstSelectedBlockIndex = selectedBlocks[0] || blockIndex + 1;
    let removedBlocks: Block[] = [];
    if (selectedBlocks.length) {
      removedBlocks = removeBlocks(selectedBlocks);
      insertBlocks(formattedClipboardBlocks, selectedBlocks[0]);
    } else {
      insertBlocks(formattedClipboardBlocks, blockIndex + 1);
    }
    setSelectedBlocks([]);

    await waitForElement(`${formattedClipboardBlocks[0].id}_0`);

    const lastAddedBlockIndex = firstSelectedBlockIndex + clipboardBlocks.length - 1;

    focusElement([lastAddedBlockIndex, 0], 'end');

    addCommand({
      action: {
        type: 'replaceBlocks',
        payload: {
          startingBlockIndex: firstSelectedBlockIndex,
          removedBlocksIndexes: selectedBlocks,
          addedBlocks: formattedClipboardBlocks,
          focusBlockIndex: firstSelectedBlockIndex,
        },
      },
      inverse: {
        type: 'replaceBlocks',
        payload: {
          startingBlockIndex: firstSelectedBlockIndex,
          removedBlocksIndexes: R.map(
            (x) => x + firstSelectedBlockIndex,
            R.range(0, formattedClipboardBlocks.length)
          ),
          addedBlocks: removedBlocks,
          focusBlockIndex: firstSelectedBlockIndex,
        },
      },
    });
  };

  const handleTab = (e: React.KeyboardEvent, blockIndex: number) => {
    e.preventDefault();
    setSelectedBlocks([blockIndex]);
    setPivotSelectedBlock(blockIndex);
    document.getSelection()?.removeAllRanges();
  };

  const handleKeyboardBlockSelection = (e: React.KeyboardEvent, blockIndex: number) => {
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

    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      handleMetakeyC(e);
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
      handleMetakeyX(e);
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      handleMetakeyV(e, blockIndex);
      return;
    }

    if (e.key === 'Tab') {
      handleTab(e, blockIndex);
    }
  };

  return {
    handleKeyboardBlockSelection,
  };
};
