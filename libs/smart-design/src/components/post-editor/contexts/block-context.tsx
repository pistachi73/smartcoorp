/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import {
  getElementTextContent,
  getHTMLStringTextContent,
  waitForElement,
} from '../helpers';
import { ToolProps } from '../post-editor';
import {
  Block,
  BlockType,
  HeaderBlockProps,
  ListBlockProps,
} from '../post-editor.types';

import { useUpdateTool } from './tool-context';
type PostEditorProviderProps = {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  children: React.ReactNode;
  getMetaData?: Promise<Function> | any;
};

const BlockConsumerContext = React.createContext<Block[]>([]);
const BlockUpdaterContext = React.createContext<
  React.Dispatch<React.SetStateAction<Block[]>>
>(() => {});
const AvailableBlocksContext = React.createContext<BlockType[]>([]);

export const BlockProvider: React.FC<PostEditorProviderProps> = ({
  children,
  blocks: initialBlocks,
  setBlocks: initialSetBlocks,
  getMetaData,
}) => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [availableBlocks] = useState<BlockType[]>(() => {
    const availableBlocks: BlockType[] = [
      'image',
      'header',
      'paragraph',
      'list',
    ];
    if (getMetaData) availableBlocks.push('link');
    return availableBlocks;
  });

  return (
    <BlockConsumerContext.Provider value={blocks}>
      <BlockUpdaterContext.Provider value={setBlocks}>
        <AvailableBlocksContext.Provider value={availableBlocks}>
          {children}
        </AvailableBlocksContext.Provider>
      </BlockUpdaterContext.Provider>
    </BlockConsumerContext.Provider>
  );
};

export const useBlocks = (): {
  blocks: Block[];
} => {
  const blocks = React.useContext(BlockConsumerContext);
  if (typeof blocks === 'undefined') {
    throw new Error('useBlocks must be used within a BlockProvider');
  }
  return { blocks };
};

export const useAvailableBlocks = (): {
  availableBlocks: BlockType[];
} => {
  const availableBlocks = React.useContext(AvailableBlocksContext);

  if (typeof availableBlocks === 'undefined') {
    throw new Error('useAvailableBlocks must be used within a BlockProvider');
  }
  return { availableBlocks };
};

export const useUpdateBlocks = (): {
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  insertParagraphBlock: (blockIndex: number, text?: string) => string;
  removeBlock: (blockIndex: number) => void;
  splitTextBlock: (blockIndex: number, innerHTML: string) => void;
  swapBlocks: (firstIndex: number, secondIndex: number) => void;
  modifyHeaderLevel: (blockIndex: number, level: 1 | 2 | 3 | 4 | 5 | 6) => void;
  modifyListStyle: (blockIndex: number, style: 'ordered' | 'unordered') => void;
} => {
  const setBlocks = React.useContext(BlockUpdaterContext);
  const setTool = useUpdateTool();
  if (typeof setBlocks === 'undefined') {
    throw new Error('useUpdateTool must be used within a BlockProvider');
  }

  const insertParagraphBlock = useCallback(
    (blockIndex: number, text = ''): string => {
      const node = document.createElement('div');
      node.innerHTML = text;
      const textContent = getElementTextContent(node);

      if (!textContent) text = '';

      const blockId = uuid();
      setBlocks((prevBlocks: Block[]): Block[] => {
        const newBlocks = [...prevBlocks];
        newBlocks.splice(blockIndex + 1, 0, {
          id: blockId,
          type: 'paragraph',
          data: {
            text,
          },
        });

        return newBlocks;
      });

      return blockId;
    },
    [setBlocks]
  );

  const removeBlock = useCallback(
    async (blockIndex: number) => {
      setBlocks((prevBlocks: Block[]): Block[] => {
        const newBlocks = [...prevBlocks];
        newBlocks.splice(blockIndex, 1);
        return newBlocks;
      });
    },
    [setBlocks]
  );

  const splitTextBlock = useCallback(
    async (blockIndex: number, innerHTML: string) => {
      const splitInnerHTML = innerHTML
        .split(/<div>(.*?)<\/div>/)
        .filter((t: string) => t !== '');

      const textAfterCaret = splitInnerHTML[1]?.replace(/<br>/g, '') || '';
      const textBeforeCaret = splitInnerHTML[0]?.replace(/<br>/g, '') || '';

      const textAfterCaretContent = getHTMLStringTextContent(textAfterCaret);
      const textBeforeCaretContent = getHTMLStringTextContent(textBeforeCaret);

      const newBlockId = insertParagraphBlock(
        blockIndex,
        textAfterCaretContent.length ? textAfterCaret : ''
      );

      document.execCommand('undo');
      document.execCommand('selectAll');
      document.execCommand(
        'insertHTML',
        false,
        textBeforeCaretContent.length ? textBeforeCaret : ''
      );

      (await waitForElement(newBlockId))?.focus();

      setTool({
        type: 'paragraph',
        blockIndex: blockIndex + 1,
      });
    },
    [insertParagraphBlock, setTool]
  );

  const swapBlocks = useCallback(
    async (firstIndex: number, secondIndex: number) => {
      await setBlocks((prevBlocks: Block[]): Block[] => {
        const newBlocks = [...prevBlocks];

        const auxBlock = newBlocks[firstIndex];
        newBlocks[firstIndex] = newBlocks[secondIndex];
        newBlocks[secondIndex] = auxBlock;

        return newBlocks;
      });
    },
    [setBlocks]
  );

  const modifyHeaderLevel = useCallback(
    (blockIndex: number, level: 1 | 2 | 3 | 4 | 5 | 6) => {
      setBlocks((prevBlocks: Block[]): Block[] => {
        const newBlocks = [...prevBlocks];
        (newBlocks[blockIndex] as HeaderBlockProps).data.level = level;
        return newBlocks;
      });
    },
    [setBlocks]
  );

  const modifyListStyle = useCallback(
    (blockIndex: number, style: 'ordered' | 'unordered') => {
      setBlocks((prevBlocks: Block[]): Block[] => {
        const newBlocks = [...prevBlocks];
        (newBlocks[blockIndex] as ListBlockProps).data.style = style;
        return newBlocks;
      });
    },
    [setBlocks]
  );

  return {
    setBlocks,
    insertParagraphBlock,
    removeBlock,
    splitTextBlock,
    swapBlocks,
    modifyHeaderLevel,
    modifyListStyle,
  };
};
