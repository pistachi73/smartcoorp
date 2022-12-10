import { useContext, useRef } from 'react';

import { useRefs } from '../contexts/refs-context';
import { useUpdateTool } from '../contexts/tool-context';
import { getCaretPosition } from '../helpers';

type UseblockNavigationResult = {
  handleBlockNavigation: (event: React.KeyboardEvent) => void;
};

export const useBlockNavigation = (
  blockIndex: number
): UseblockNavigationResult => {
  const { refs, focusBlockByIndex, getNextFocusableBlock } = useRefs();
  const setTool = useUpdateTool();

  const handleBlockNavigation = (event: React.KeyboardEvent) => {
    const element = refs.current[blockIndex];
    const caretPosition = getCaretPosition(element);

    if (
      (event.key === 'ArrowDown' || event.key === 'ArrowRight') &&
      caretPosition === element.textContent.length
    ) {
      event.preventDefault();
      setTool(null);
      const nextFocusableBlockIndex = getNextFocusableBlock(blockIndex, 1);
      focusBlockByIndex(nextFocusableBlockIndex, 'start');
    }

    if (
      (event.key === 'ArrowUp' ||
        event.key === 'ArrowLeft' ||
        event.key === 'Backspace') &&
      caretPosition === 0
    ) {
      event.preventDefault();
      setTool(null);
      const prevFocusableBlockIndex = getNextFocusableBlock(blockIndex, -1);
      focusBlockByIndex(prevFocusableBlockIndex, 'end');
    }
  };

  return { handleBlockNavigation };
};
