import { useCallback, useState } from 'react';

import {
  Block,
  HeaderBlockProps,
  ParagraphBlockProps,
} from '../post-editor.types';

type UsePostEditorReturn = {
  blocks: Block[];
  updateHeaderBlock: (text: string, blockIndex: number) => void;
  [key: string]: any;
};

export const usePostEditor = (initialBlocks: Block[]): UsePostEditorReturn => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);

  const updateParagraphBlock = useCallback(
    (text: string, blockIndex: number) => {
      setBlocks((prevBlocks: Block[]): Block[] => {
        const newBlocks = [...prevBlocks];
        (newBlocks[blockIndex] as ParagraphBlockProps).data.text = text;
        return newBlocks;
      });
    },
    []
  );

  const updateHeaderBlock = useCallback((text: string, blockIndex: number) => {
    setBlocks((prevBlocks: Block[]): Block[] => {
      const newBlocks = [...prevBlocks];
      (newBlocks[blockIndex] as HeaderBlockProps).data.text = text;
      return newBlocks;
    });
  }, []);

  return {
    blocks,
    updateParagraphBlock,
    updateHeaderBlock,
  };
};
