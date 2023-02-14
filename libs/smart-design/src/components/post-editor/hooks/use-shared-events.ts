import {
  useBlockSelectionConsumerContext,
  useBlockSelectionUpdaterContext,
} from '../contexts/block-selection-context/block-selection-context';
import {
  useBlocksDBConsumerContext,
  useBlocksDBUpdaterContext,
} from '../contexts/blocks-context';
import type { ToAddBlock } from '../contexts/blocks-context/blocks-reducer/blocks-reducer.types';
import { useRefsContext } from '../contexts/refs-context';
import { buildParagraphBlock } from '../helpers';
import { getBlockContainerAttributes } from '../helpers/get-block-container-attributes';
import { waitForElement } from '../helpers/wait-for-element';

import { getToRemoveBlocksFromSelection } from './use-block-selection/use-block-selection-helpers';

type UseSharedEventsResult = {
  handleSharedKeyDown: (e: React.KeyboardEvent) => void;
  handleSharedClickDown: (e: React.MouseEvent) => void;
};

export const useSharedEvents = (): UseSharedEventsResult => {
  const { replaceBlocks, undo, redo, buildFocusFieldAction } =
    useBlocksDBUpdaterContext();
  const blocksDB = useBlocksDBConsumerContext();
  const { blockRefs } = useRefsContext();
  const { setSelectedBlocks } = useBlockSelectionUpdaterContext();
  const { selectedBlocks } = useBlockSelectionConsumerContext();

  const handleBackspaceDelete = async (e: React.KeyboardEvent) => {
    if (!selectedBlocks.length) return;

    e.preventDefault();

    const firstSelectedBlockIndex = selectedBlocks[0];
    const {
      chainBlockIndex: firstSelectedBlockChainBlockIndex,
      chainId: firstSelectedBlockChainId,
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

    replaceBlocks({
      toRemoveBlocks,
      toAddBlocks,
      undo: buildFocusFieldAction({
        fieldId: `${firstSelectedBlockId}_0`,
        position: 'end',
      }),
      redo: buildFocusFieldAction({
        fieldId: `${newBlock.id}_0`,
        position: 'end',
      }),
    });

    (await waitForElement(`${newBlock.id}_0`))?.focus();
    setSelectedBlocks([]);
  };

  const handleSharedKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      handleBackspaceDelete(e);
    }

    if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === 'z') {
      e.preventDefault();
      if (blocksDB.canUndo) undo();
    }
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z') {
      e.preventDefault();
      if (blocksDB.canRedo) redo();
    }
  };

  const handleSharedClickDown = (e: React.MouseEvent) => {
    if (!selectedBlocks.length) return;
    setSelectedBlocks([]);
  };
  return { handleSharedKeyDown, handleSharedClickDown };
};
