import { useCallback } from 'react';

import { useUpdateBlocks } from '../contexts/block-context';
import { useRefs } from '../contexts/refs-context';

type UseBlockEditResult = {
  removeBlockAndFocusPrevious: () => void;
};

export const useBlockEdit = (blockIndex: number): UseBlockEditResult => {
  const { removeBlock } = useUpdateBlocks();
  const { refs, focusBlockByIndex, getNextFocusableBlock } = useRefs();

  const removeBlockAndFocusPrevious = useCallback(async () => {
    await removeBlock(blockIndex);
    const prevFocusableBlock = getNextFocusableBlock(blockIndex, -1);
    focusBlockByIndex(prevFocusableBlock, 'end');
    refs.current.pop();
  }, [blockIndex, focusBlockByIndex, getNextFocusableBlock, removeBlock, refs]);

  return { removeBlockAndFocusPrevious };
};
