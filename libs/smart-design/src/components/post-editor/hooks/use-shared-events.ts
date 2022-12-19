import { useUpdateBlocks } from '../contexts/block-context';
import { useUpdateTool } from '../contexts/tool-context';
import { waitForElement } from '../helpers/wait-for-element';

import { useBlockSelection } from './use-block-selection';

type UseSharedEventsResult = {
  handleSharedKeyDown: (e: React.KeyboardEvent) => void;
  handleSharedClickDown: (e: React.MouseEvent) => void;
};

export const useSharedEvents = (): UseSharedEventsResult => {
  const { selectedBlocks, setSelectedBlocks } = useBlockSelection();
  const { removeBlock, insertParagraphBlock } = useUpdateBlocks();
  const setTool = useUpdateTool();

  const handleBackspaceDelete = async (e: React.KeyboardEvent) => {
    if (!selectedBlocks.length) return;

    e.preventDefault();
    const firstSelectedBlockIndex = selectedBlocks[0];

    for (let i = selectedBlocks.length - 1; i >= 0; i--) {
      removeBlock(selectedBlocks[i]);
    }

    const id = insertParagraphBlock(firstSelectedBlockIndex - 1);
    (await waitForElement(id))?.focus();
    setSelectedBlocks([]);
    setTool(null);
  };

  const handleSharedKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      handleBackspaceDelete(e);
    }
  };

  const handleSharedClickDown = (e: React.MouseEvent) => {
    if (!selectedBlocks.length) return;
    setSelectedBlocks([]);
  };
  return { handleSharedKeyDown, handleSharedClickDown };
};
