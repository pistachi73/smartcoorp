import { useCallback, useContext } from 'react';

import { useUpdateBlocks } from '../contexts/block-context';
import { RefsContext } from '../contexts/refs-context';
import {
  getElementTextContent,
  setCaretPosition,
  waitForElement,
} from '../helpers';

export const useRefs = (): {
  refs: any;
  focusBlockByIndex: (
    blockIndex: number,
    caretPosition: 'start' | 'end' | number
  ) => void;
  getNextFocusableBlock: (blockIndex: number, direction: 1 | -1) => number;
} => {
  const refs = useContext(RefsContext);
  const { insertParagraphBlock } = useUpdateBlocks();

  if (typeof refs === 'undefined')
    throw new Error('useRefs must be used within a RefsProvider');

  const focusBlockByIndex = useCallback(
    async (blockIndex: number, caretPosition: 'start' | 'end' | number) => {
      if (blockIndex === -1) {
        refs.current[0].focus();
        return;
      }

      if (blockIndex === refs.current.length) {
        const lastBlock = refs.current[blockIndex - 1];
        if (lastBlock.className.includes('paragraph-block')) {
          lastBlock.focus();
        } else {
          const newBlockId = insertParagraphBlock(blockIndex);
          (await waitForElement(newBlockId))?.focus();
        }
        return;
      }

      const block = refs.current[blockIndex];
      const position =
        caretPosition === 'start'
          ? 0
          : caretPosition === 'end'
          ? getElementTextContent(block).length
          : caretPosition;

      setCaretPosition({
        element: block,
        position,
      });
    },
    [refs, insertParagraphBlock]
  );

  const getNextFocusableBlock = useCallback(
    (blockIndex: number, direction: 1 | -1): number => {
      let nextFocusableBlockIndex = blockIndex + direction;
      let isNextBlockFocusable = false;
      while (
        !isNextBlockFocusable &&
        nextFocusableBlockIndex < refs.current.length - 1 &&
        nextFocusableBlockIndex > -1
      ) {
        const nextBlock = refs.current[nextFocusableBlockIndex];
        if (!nextBlock.className?.includes('skip-tab')) {
          isNextBlockFocusable = true;
        } else {
          nextFocusableBlockIndex += direction;
        }
      }

      return nextFocusableBlockIndex;
    },
    [refs]
  );

  return {
    refs,
    focusBlockByIndex,
    getNextFocusableBlock,
  };
};
