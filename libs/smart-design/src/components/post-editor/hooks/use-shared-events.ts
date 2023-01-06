import { useBlockUpdaterContext } from '../contexts/block-context';
import {
  useBlockSelectionConsumerContext,
  useBlockSelectionUpdaterContext,
} from '../contexts/block-selection-context';
import { useUpdateTool } from '../contexts/tool-context';
import { waitForElement } from '../helpers/wait-for-element';

import { useCommands } from './use-commands/use-commands';

type UseSharedEventsResult = {
  handleSharedKeyDown: (e: React.KeyboardEvent) => void;
  handleSharedClickDown: (e: React.MouseEvent) => void;
};

export const useSharedEvents = (): UseSharedEventsResult => {
  const { setSelectedBlocks } = useBlockSelectionUpdaterContext();
  const { selectedBlocks, pivotSelectedBlock } = useBlockSelectionConsumerContext();
  const { removeBlocks, insertParagraphBlock } = useBlockUpdaterContext();
  const { undo, redo, addCommand } = useCommands();
  const setTool = useUpdateTool();

  const handleBackspaceDelete = async (e: React.KeyboardEvent) => {
    if (!selectedBlocks.length) return;

    e.preventDefault();
    const firstSelectedBlockIndex = selectedBlocks[0];

    const removedBlocks = removeBlocks(selectedBlocks);
    const id = insertParagraphBlock(firstSelectedBlockIndex - 1);
    (await waitForElement(`${id}_0`))?.focus();
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

    setTool(null);
  };

  const handleSharedKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      handleBackspaceDelete(e);
    }

    if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === 'z') {
      e.preventDefault();
      undo();
    }
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z') {
      e.preventDefault();
      redo();
    }
  };

  const handleSharedClickDown = (e: React.MouseEvent) => {
    if (!selectedBlocks.length) return;
    setSelectedBlocks([]);
  };
  return { handleSharedKeyDown, handleSharedClickDown };
};
