import { useUpdateTool } from '../contexts/tool-context';
import { getCaretPosition } from '../helpers';

import { useBlockSelection } from './use-block-selection';
import { useRefs } from './use-refs';

type UseblockNavigationResult = {
  handleKeyboardBlockNavigation: (event: React.KeyboardEvent) => void;
};

export const useBlockNavigation = (
  blockIndex: number
): UseblockNavigationResult => {
  const { refs, focusBlockByIndex, getNextFocusableBlock } = useRefs();
  const { selectedBlocks, setSelectedBlocks } = useBlockSelection();
  const setTool = useUpdateTool();

  const handleArrowDownRight = (event: React.KeyboardEvent) => {
    const caretPosition = getCaretPosition(refs.current[blockIndex]);
    const element = refs.current[blockIndex];

    if (selectedBlocks.length > 0) {
      event.preventDefault();
      focusBlockByIndex(selectedBlocks[selectedBlocks.length - 1], 'end');
      setSelectedBlocks([]);
      return;
    }

    if (caretPosition === element.textContent.length) {
      event.preventDefault();
      setTool(null);
      const nextFocusableBlockIndex = getNextFocusableBlock(blockIndex, 1);
      focusBlockByIndex(nextFocusableBlockIndex, 'start');
    }
  };

  const handleArrowDownRightBackspace = (event: React.KeyboardEvent) => {
    const caretPosition = getCaretPosition(refs.current[blockIndex]);

    if (selectedBlocks.length > 0) {
      event.preventDefault();
      focusBlockByIndex(selectedBlocks[0], 'start');
      setSelectedBlocks([]);
      return;
    }

    if (caretPosition === 0) {
      event.preventDefault();
      setTool(null);
      const prevFocusableBlockIndex = getNextFocusableBlock(blockIndex, -1);
      focusBlockByIndex(prevFocusableBlockIndex, 'end');
    }
  };

  const handleKeyboardBlockNavigation = (e: React.KeyboardEvent) => {
    const sharedCondition = !e.shiftKey && !e.metaKey && !e.ctrlKey;

    if (sharedCondition && (e.key === 'ArrowDown' || e.key === 'ArrowRight')) {
      handleArrowDownRight(e);
    }

    if (
      sharedCondition &&
      (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'Backspace')
    ) {
      handleArrowDownRightBackspace(e);
    }
  };

  return { handleKeyboardBlockNavigation };
};
