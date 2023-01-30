import * as R from 'ramda';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import {
  useBlockSelectionConsumerContext,
  useBlockSelectionUpdaterContext,
} from '../../contexts/block-selection-context';
import { useBlocksDBUpdaterContext } from '../../contexts/blocks-db-context/';
import {
  ADD_BLOCKS,
  COPY_BLOCKS,
  REPLACE_BLOCKS,
  ToAddBlock,
} from '../../contexts/blocks-db-context/blocks-db-reducer';
import { FOCUS_FIELD } from '../../contexts/blocks-db-context/undo-redo-reducer';
import { useRefsContext } from '../../contexts/refs-context';
import {
  buildParagraphBlock,
  getBlockContainerAttributes,
  waitForElement,
} from '../../helpers';

import { getToRemoveBlocksFromSelection } from './use-block-selection-helpers';

export const useBlockSelection = () => {
  const [prevRange, setPrevRange] = useState<Range | null>();
  const { blockRefs, fieldRefs, focusField, setPrevCaretPosition } =
    useRefsContext();

  const dispatchBlocksDB = useBlocksDBUpdaterContext();

  const { selectedBlocks, clipboardBlocks, pivotSelectedBlock } =
    useBlockSelectionConsumerContext();
  const { setClipboardBlocks, setPivotSelectedBlock, setSelectedBlocks } =
    useBlockSelectionUpdaterContext();

  const handleShiftUp = (e: React.KeyboardEvent, blockIndex: number) => {
    console.log('handleShiftUp');
    console.log('Pivot: ', pivotSelectedBlock);

    console.log('Selected Blocks: ', selectedBlocks);
    // If some blocks are selected,
    // select the block above the first selected block
    // or deselect the last block
    if (selectedBlocks.length) {
      e.preventDefault();
      document.getSelection()?.removeAllRanges();

      const pivotSelectedBlockIndex =
        selectedBlocks.indexOf(pivotSelectedBlock);

      if (
        pivotSelectedBlockIndex === -1 ||
        (selectedBlocks[0] === 0 &&
          (pivotSelectedBlockIndex > 0 || selectedBlocks.length === 1))
      )
        return;

      const newSelectedBlocks = [...selectedBlocks];

      if (pivotSelectedBlockIndex > 0 || selectedBlocks.length === 1) {
        newSelectedBlocks.unshift(selectedBlocks[0] - 1);
      } else {
        newSelectedBlocks.pop();
      }

      console.log(newSelectedBlocks);

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
        setPivotSelectedBlock(blockIndex);
        setPrevRange(null);
        document.getSelection()?.removeAllRanges();
      } else {
        setPrevRange(newRange);
      }
    }
  };

  const handleShiftDown = (e: React.KeyboardEvent, blockIndex: number) => {
    if (selectedBlocks.length) {
      e.preventDefault();

      document.getSelection()?.removeAllRanges();

      const pivotSelectedBlockIndex =
        selectedBlocks.indexOf(pivotSelectedBlock);

      if (
        pivotSelectedBlockIndex === -1 ||
        (selectedBlocks[selectedBlocks.length - 1] ===
          fieldRefs.current.length - 1 &&
          (pivotSelectedBlockIndex === 0 || selectedBlocks.length === 1))
      )
        return;

      const newSelectedBlocks = [...selectedBlocks];

      if (pivotSelectedBlockIndex <= 0 || selectedBlocks.length === 1) {
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
          blockIndex === fieldRefs.current.length - 1
            ? [blockIndex]
            : [blockIndex, blockIndex + 1];
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
    //TOOD: fix this
    e.preventDefault();

    if (
      !selectedBlocks.length ||
      selectedBlocks[selectedBlocks.length - 1] === fieldRefs.current.length - 1
    )
      return;

    setSelectedBlocks(R.map((x) => x + 1));

    setPivotSelectedBlock(
      (prevCenterSelectedBlock) => prevCenterSelectedBlock + 1
    );

    const swapedBlocksIndexes: [number[], number[]] = [
      selectedBlocks,
      [selectedBlocks[selectedBlocks.length - 1] + 1],
    ];

    const inversedSwapedBlocksIndexes: [number[], number[]] = [
      swapedBlocksIndexes[0].map((x) => x + swapedBlocksIndexes[1].length),
      swapedBlocksIndexes[1].map((x) => x - swapedBlocksIndexes[0].length),
    ];
    // swapBlocks(swapedBlocksIndexes[0], swapedBlocksIndexes[1]);

    // addCommand({
    //   action: {
    //     type: 'swapBlocks',
    //     payload: {
    //       swapedBlocksIndexes,
    //       selectedBlocks: inversedSwapedBlocksIndexes[0],
    //     },
    //   },
    //   inverse: {
    //     type: 'swapBlocks',
    //     payload: {
    //       swapedBlocksIndexes: inversedSwapedBlocksIndexes,
    //       selectedBlocks: swapedBlocksIndexes[0],
    //     },
    //   },
    // });
  };

  const handleMetakeyArrowUp = async (e: React.KeyboardEvent) => {
    //TODO: Fix this
    e.preventDefault();

    if (!selectedBlocks.length || selectedBlocks[0] === 0) return;

    const swapedBlocksIndexes: [number[], number[]] = [
      selectedBlocks,
      [selectedBlocks[0] - 1],
    ];

    // [[1, 2], [3]] -> [[1], [2, 3]]
    const inversedSwapedBlocksIndexes: [number[], number[]] = [
      swapedBlocksIndexes[0].map((x) => x - swapedBlocksIndexes[1].length),
      swapedBlocksIndexes[1].map((x) => x + swapedBlocksIndexes[0].length),
    ];
    //swapBlocks(swapedBlocksIndexes[0], swapedBlocksIndexes[1]);

    setSelectedBlocks(R.map((x) => x - 1));
    setPivotSelectedBlock(
      (prevCenterSelectedBlock) => prevCenterSelectedBlock - 1
    );

    // addCommand({
    //   action: {
    //     type: 'swapBlocks',
    //     payload: {
    //       swapedBlocksIndexes,
    //       selectedBlocks: inversedSwapedBlocksIndexes[0],
    //     },
    //   },
    //   inverse: {
    //     type: 'swapBlocks',
    //     payload: {
    //       swapedBlocksIndexes: inversedSwapedBlocksIndexes,
    //       selectedBlocks: swapedBlocksIndexes[0],
    //     },
    //   },
    // });
  };

  const handleMetakeyC = (e: React.KeyboardEvent) => {
    if (!selectedBlocks.length) {
      setClipboardBlocks(null);
      return;
    }

    e.preventDefault();
    const selectedBlockIds = selectedBlocks.map((i) => {
      const { blockId } = getBlockContainerAttributes(blockRefs.current[i]);
      return blockId;
    });

    dispatchBlocksDB({
      type: COPY_BLOCKS,
      payload: {
        blockIds: selectedBlockIds,
        onCopy: (blocksDB) => setClipboardBlocks(blocksDB),
      },
    });
  };

  const handleMetakeyX = async (e: React.KeyboardEvent) => {
    if (!selectedBlocks.length) {
      setClipboardBlocks(null);
      return;
    }

    e.preventDefault();

    // 1: COPY SELECTED BLOCKS
    const selectedBlockIds = selectedBlocks.map((i) => {
      const { blockId } = getBlockContainerAttributes(blockRefs.current[i]);
      return blockId;
    });
    dispatchBlocksDB({
      type: COPY_BLOCKS,
      payload: {
        blockIds: selectedBlockIds,
        onCopy: (blocksDB) => setClipboardBlocks(blocksDB),
      },
    });

    // 2: REPLACE SELECTED BLOCKS WITH PARAGRAPH BLOCK
    const firstSelectedBlockIndex = selectedBlocks[0];
    const {
      chainId: firstSelectedBlockChainId,
      chainBlockIndex: firstSelectedBlockChainBlockIndex,
      blockId: firstSelectedBlockId,
    } = getBlockContainerAttributes(blockRefs.current[firstSelectedBlockIndex]);

    const toRemoveBlocks = getToRemoveBlocksFromSelection(
      selectedBlocks,
      blockRefs.current
    );

    const newBlock = buildParagraphBlock(firstSelectedBlockChainId);

    const toAddBlocks: ToAddBlock[] = [
      [newBlock, firstSelectedBlockChainId, firstSelectedBlockChainBlockIndex],
    ];

    dispatchBlocksDB({
      type: REPLACE_BLOCKS,
      payload: {
        toRemoveBlocks,
        toAddBlocks,
        undoAction: {
          type: FOCUS_FIELD,
          payload: {
            fieldId: `${firstSelectedBlockId}_0`,
            position: 'end',
            setPrevCaretPosition,
          },
        },
        redoAction: {
          type: FOCUS_FIELD,
          payload: {
            fieldId: `${newBlock.id}_0`,
            position: 'end',
            setPrevCaretPosition,
          },
        },
      },
    });

    (await waitForElement(`${newBlock.id}_0`))?.focus();
    setSelectedBlocks([]);
  };

  const handleMetakeyV = async (
    e: React.KeyboardEvent,
    blockIndex: number,
    chainBlockIndex: number,
    chainId: string
  ) => {
    if (!clipboardBlocks) return;

    e.preventDefault();

    // 1: FORMAT BLOCKS TO ADD IDS
    const toAddBlocks: ToAddBlock[] = Object.keys(clipboardBlocks).map(
      (blockId, i) => {
        const id = uuid();
        const formattedBlock = {
          ...clipboardBlocks[blockId],
          id,
        };
        return [formattedBlock, chainId, chainBlockIndex + 1 + i];
      }
    );

    const firstSelectedBlockIndex = selectedBlocks[0] ?? chainBlockIndex;
    const { blockId: firstSelectedBlockId } = getBlockContainerAttributes(
      blockRefs.current[firstSelectedBlockIndex]
    );

    const lastAddedBlockIndex =
      firstSelectedBlockIndex + Object.keys(clipboardBlocks).length;
    const lastAddedBlockId = toAddBlocks[toAddBlocks.length - 1][0].id;

    const toRemoveBlocks = getToRemoveBlocksFromSelection(
      selectedBlocks,
      blockRefs.current
    );

    const undoAction = {
      type: FOCUS_FIELD,
      payload: {
        fieldId: `${firstSelectedBlockId}_0`,
        position: 'end',
        setPrevCaretPosition,
      },
    } as const;

    const redoAction = {
      type: FOCUS_FIELD,
      payload: {
        fieldId: `${lastAddedBlockId}_0`,
        position: 'end',
        setPrevCaretPosition,
      },
    } as const;

    if (selectedBlocks.length) {
      dispatchBlocksDB({
        type: REPLACE_BLOCKS,
        payload: {
          toRemoveBlocks,
          toAddBlocks,
          undoAction,
          redoAction,
        },
      });
    } else {
      dispatchBlocksDB({
        type: ADD_BLOCKS,
        payload: {
          toAddBlocks,
          undoAction,
          redoAction,
        },
      });
    }
    setSelectedBlocks([]);

    await waitForElement(`${lastAddedBlockId}_0`);

    focusField([lastAddedBlockIndex, 0], 'end');
  };

  const handleTab = (e: React.KeyboardEvent, blockIndex: number) => {
    e.preventDefault();
    setSelectedBlocks([blockIndex]);
    setPivotSelectedBlock(blockIndex);
    document.getSelection()?.removeAllRanges();
  };

  const handleKeyboardBlockSelection = (
    e: React.KeyboardEvent,
    blockIndex: number,
    chainBlockIndex: number,
    chainId: string
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

    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      handleMetakeyC(e);
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'x') {
      handleMetakeyX(e);
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      handleMetakeyV(e, blockIndex, chainBlockIndex, chainId);
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
