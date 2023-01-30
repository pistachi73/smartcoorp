import {
  useBlockSelectionConsumerContext,
  useBlockSelectionUpdaterContext,
} from '../contexts/block-selection-context/block-selection-context';
import {
  useBlocksDBConsumerContext,
  useBlocksDBUpdaterContext,
} from '../contexts/blocks-db-context';
import { ToAddBlock } from '../contexts/blocks-db-context/blocks-db-reducer/blocks-db-reducer.types';
import { useRefsContext } from '../contexts/refs-context';
import { useUpdateTool } from '../contexts/tool-context';
import { buildParagraphBlock } from '../helpers';
import { getBlockContainerAttributes } from '../helpers/get-block-container-attributes';
import { waitForElement } from '../helpers/wait-for-element';

import { getToRemoveBlocksFromSelection } from './use-block-selection/use-block-selection-helpers';

type UseSharedEventsResult = {
  handleSharedKeyDown: (e: React.KeyboardEvent) => void;
  handleSharedClickDown: (e: React.MouseEvent) => void;
};

export const useSharedEvents = (): UseSharedEventsResult => {
  const dispatchBlocksDB = useBlocksDBUpdaterContext();
  const blocksDB = useBlocksDBConsumerContext();
  const { blockRefs, setPrevCaretPosition } = useRefsContext();
  const { setSelectedBlocks } = useBlockSelectionUpdaterContext();
  const { selectedBlocks, pivotSelectedBlock } =
    useBlockSelectionConsumerContext();
  const setTool = useUpdateTool();

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

    dispatchBlocksDB({
      type: 'REPLACE_BLOCKS',
      payload: {
        toRemoveBlocks,
        toAddBlocks,
        undoAction: {
          type: 'FOCUS_FIELD',
          payload: {
            fieldId: `${firstSelectedBlockId}_0`,
            position: 'end',
            setPrevCaretPosition,
          },
        },
        redoAction: {
          type: 'FOCUS_FIELD',
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
    //removeBlocksFromChain(toRemoveBlocks);

    // setTool(null);
  };

  const handleSharedKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      handleBackspaceDelete(e);
    }

    if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === 'z') {
      e.preventDefault();
      if (blocksDB.canUndo) dispatchBlocksDB({ type: 'UNDO' });
    }
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z') {
      e.preventDefault();
      if (blocksDB.canRedo) dispatchBlocksDB({ type: 'REDO' });
    }
  };

  const handleSharedClickDown = (e: React.MouseEvent) => {
    if (!selectedBlocks.length) return;
    setSelectedBlocks([]);
  };
  return { handleSharedKeyDown, handleSharedClickDown };
};
