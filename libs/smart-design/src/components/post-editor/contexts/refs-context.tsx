import React, { useCallback, useEffect } from 'react';

import next from 'next/types';

import {
  getElementTextContent,
  setCaretPosition,
  waitForElement,
} from '../helpers';

import { useUpdateBlocks } from './block-context';
import { useUpdateTool } from './tool-context';

const RefsContext = React.createContext<any>([]);

export const RefsProvider = ({ children }: { children: React.ReactNode }) => {
  const refs = React.useRef<any>([]);

  return <RefsContext.Provider value={refs}>{children}</RefsContext.Provider>;
};

export const useRefs = (): {
  refs: any;
  focusNextBlock: (blockIndex: number) => void;
  focusPreviousBlock: (blockIndex: number) => void;
} => {
  const refs = React.useContext(RefsContext);
  const { insertParagraphBlock } = useUpdateBlocks();
  const setTool = useUpdateTool();

  if (typeof refs === 'undefined')
    throw new Error('useRefs must be used within a RefsProvider');

  const focusNextBlock = useCallback(
    async (blockIndex: number) => {
      if (!refs.current[blockIndex + 1]) {
        if (!refs.current[blockIndex].className.includes('paragraph-block')) {
          const newBlockId = insertParagraphBlock(blockIndex);

          (await waitForElement(newBlockId))?.focus();
          setTool({
            blockIndex: blockIndex + 1,
            type: 'paragraph',
          });
        } else return;
      } else {
        const nextBlock = refs.current[blockIndex + 1];
        setCaretPosition({ element: nextBlock, position: 0 });
      }
    },
    [insertParagraphBlock, refs, setTool]
  );

  const focusPreviousBlock = useCallback(
    (blockIndex: number) => {
      if (blockIndex === 0) {
        refs.current[0].focus();
      } else {
        const previousBlock = refs.current[blockIndex - 1];
        const textContent = getElementTextContent(previousBlock);

        setCaretPosition({
          element: previousBlock,
          position: textContent.length,
        });
      }
    },
    [refs]
  );
  return {
    refs,
    focusNextBlock,
    focusPreviousBlock,
  };
};
