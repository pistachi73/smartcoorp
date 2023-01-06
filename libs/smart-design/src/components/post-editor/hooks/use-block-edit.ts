import { useCallback } from 'react';

import { useBlockUpdaterContext } from '../contexts/block-context';
import { useRefs } from '../hooks';

type UseBlockEditResult = {
  removeBlockAndFocusPrevious: () => void;
};

export const useBlockEdit = (blockIndex: number): UseBlockEditResult => {
  const { removeBlocks } = useBlockUpdaterContext();
  const { refs, focusBlockByIndex, getNextFocusableBlock } = useRefs();

  const removeBlockAndFocusPrevious = useCallback(async () => {
    await removeBlocks([blockIndex]);
    const prevFocusableBlock = getNextFocusableBlock(blockIndex, -1);
    focusBlockByIndex(prevFocusableBlock, 'end');
    refs.current.pop();
  }, [blockIndex, focusBlockByIndex, getNextFocusableBlock, removeBlocks, refs]);

  return { removeBlockAndFocusPrevious };
};
