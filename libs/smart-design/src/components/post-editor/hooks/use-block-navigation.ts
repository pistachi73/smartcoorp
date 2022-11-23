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
  const { refs, focusNextBlock, focusPreviousBlock } = useRefs();
  const setTool = useUpdateTool();

  const handleBlockNavigation = (event: React.KeyboardEvent) => {
    const element = refs.current[blockIndex];
    const caretPosition = getCaretPosition(element);

    if (event.key === 'Backspace') {
      setTool(null);
      if (caretPosition === 0) {
        event.preventDefault();
        focusPreviousBlock(blockIndex);
      }
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      setTool(null);
      console.log(element);
      if (refs.current[blockIndex + 1].className.includes('skip-tab')) {
        event.preventDefault();
        focusNextBlock(blockIndex + 1);
      }
      if (caretPosition === element.textContent.length) {
        event.preventDefault();
        focusNextBlock(blockIndex);
      }
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      setTool(null);
      console.log(refs.current[blockIndex - 1]);

      if (refs.current[blockIndex - 1].className.includes('skip-tab')) {
        event.preventDefault();
        focusNextBlock(blockIndex - 1);
      }
      if (caretPosition === 0) {
        event.preventDefault();
        focusPreviousBlock(blockIndex);
      }
    }
  };

  return { handleBlockNavigation };
};
