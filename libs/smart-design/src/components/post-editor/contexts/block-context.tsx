/* eslint-disable @typescript-eslint/no-empty-function */

import update from 'immutability-helper';
import * as R from 'ramda';
import React, { useCallback, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { getElementTextContent, getHTMLStringTextContent, waitForElement } from '../helpers';
import {
  addIdxToObject,
  filterAndSaveRemoved,
  log,
  removeIdxFromObject,
  updateBlocks,
} from '../helpers/fp-helpers';
import { Block, BlockType, EveryBlockFields, ParagraphBlockProps } from '../post-editor.types';

import { FocusableElement } from './refs-context';
import { useUpdateTool } from './tool-context';

type PostEditorProviderProps = {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  children: React.ReactNode;
  getMetaData?: Promise<Function> | any;
};

const BlockConsumerContext = React.createContext<Block[]>([]);
const BlockUpdaterContext = React.createContext<React.Dispatch<React.SetStateAction<Block[]>>>(
  () => {}
);
const AvailableBlocksContext = React.createContext<BlockType[]>([]);

export const BlockProvider: React.FC<PostEditorProviderProps> = ({
  children,
  blocks: initialBlocks,
  setBlocks: initialSetBlocks,
  getMetaData,
}) => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [availableBlocks] = useState<BlockType[]>(() => {
    const availableBlocks: BlockType[] = ['image', 'header', 'paragraph', 'list'];
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

export const useBlockUpdaterContext = (): {
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  insertParagraphBlock: (blockIndex: number, text?: string) => string;
  removeBlocks: (blockIndexes: number[]) => Block[];
  splitTextBlock: (
    blockIndex: number,
    innerHTML: string,
    splitedBlockRef?: FocusableElement
  ) => Promise<{
    newBlockId: string;
    textBefore: string;
    textAfter: string;
  }>;
  getBlocksData: (blockIndexes: number[]) => Block[];
  insertBlocks: (blocks: Block[], position: number) => void;
  modifyHeaderLevel: (blockIndex: number, level: 1 | 2 | 3 | 4 | 5 | 6) => void;
  modifyListStyle: (blockIndex: number, style: 'ordered' | 'unordered') => void;
  updateBlockFields: (blockIndex: number, data: EveryBlockFields) => void;
  swapBlocks: (firstIndex: number[], secondIndex: number[]) => void;
} => {
  const setBlocks = React.useContext(BlockUpdaterContext);
  const setTool = useUpdateTool();
  if (typeof setBlocks === 'undefined') {
    throw new Error('useUpdateTool must be used within a BlockProvider');
  }

  const updateBlockFields = useCallback(
    (blockIndex: number, data: EveryBlockFields) => {
      const updatedFields = Object.keys(data).map((field) => ({
        [field]: { $set: data[field as keyof EveryBlockFields] },
      }));

      setBlocks(
        updateBlocks({
          [blockIndex]: {
            data: { ...R.mergeAll(updatedFields) },
          },
        })
      );
    },
    [setBlocks]
  );
  const insertParagraphBlock = useCallback(
    (blockIndex: number, text = ''): string => {
      const node = document.createElement('div');
      node.innerHTML = text;
      const textContent = getElementTextContent(node);

      if (!textContent) text = '';

      const blockId = uuid();
      const newParagraphBlock: ParagraphBlockProps = {
        id: blockId,
        type: 'paragraph',
        data: {
          text,
        },
      };

      setBlocks(
        updateBlocks({
          $splice: [[blockIndex + 1, 0, newParagraphBlock]],
        })
      );

      return blockId;
    },
    [setBlocks]
  );

  const removeBlocks = useCallback(
    (blockIndexes: number[]): Block[] => {
      if (!blockIndexes.length) return [];

      const removedBlocks: Block[] = [];
      const filterByIndexAndSaveRemoved = filterAndSaveRemoved(
        (x: any) => !blockIndexes.includes(x.idx)
      );

      setBlocks(
        updateBlocks({
          $apply: R.compose(
            removeIdxFromObject,
            R.filter(filterByIndexAndSaveRemoved(removedBlocks)),
            addIdxToObject
          ),
        })
      );

      return removeIdxFromObject(removedBlocks);
    },
    [setBlocks]
  );
  const insertBlocks = useCallback(
    (blocks: Block[], position: number) => {
      setBlocks(
        updateBlocks({
          $splice: [[position, 0, ...blocks]],
        })
      );
    },
    [setBlocks]
  );

  const splitTextBlock = useCallback(
    async (blockIndex: number, innerHTML: string, splitedBlockRef?: FocusableElement) => {
      const splitInnerHTML = innerHTML.split(/<div>(.*?)<\/div>/).filter((t: string) => t !== '');

      const textAfterCaret = (splitInnerHTML[1]?.replace(/<br>/g, '') || '').trim();
      const textBeforeCaret = (splitInnerHTML[0]?.replace(/<br>/g, '') || '').trim();

      const textAfterCaretContent = getHTMLStringTextContent(textAfterCaret);
      const textBeforeCaretContent = getHTMLStringTextContent(textBeforeCaret);

      const newBlockId = insertParagraphBlock(
        blockIndex,
        textAfterCaretContent.length ? textAfterCaret : ''
      );

      if (splitedBlockRef) {
        updateBlockFields(blockIndex, { text: textBeforeCaret || '' });
        splitedBlockRef.innerHTML = textBeforeCaretContent.length ? textBeforeCaret : '';
      } else {
        document.execCommand('undo');
        document.execCommand('selectAll');
        document.execCommand(
          'insertHTML',
          false,
          textBeforeCaretContent.length ? textBeforeCaret : ''
        );
      }

      (await waitForElement(`${newBlockId}_0`))?.focus();

      setTool({
        type: 'paragraph',
        blockIndex: blockIndex + 1,
      });

      return {
        newBlockId,
        textBefore: textBeforeCaretContent,
        textAfter: textAfterCaretContent,
      };
    },
    [insertParagraphBlock, setTool, updateBlockFields]
  );

  const swapBlocks = useCallback(
    (blockIndexesOne: number[], blockIndexesTwo: number[]) => {
      const [deleteIndexes, pivotIndexes] =
        blockIndexesOne[0] < blockIndexesTwo[0]
          ? [blockIndexesTwo, blockIndexesOne]
          : [blockIndexesOne, blockIndexesTwo];

      let auxSplicedBlocks: Block[] = [];

      const spliceBlocks = (prevBlocks: Block[]): Block[] => {
        auxSplicedBlocks = prevBlocks.splice(deleteIndexes[0], deleteIndexes.length);
        return prevBlocks;
      };

      setBlocks((prev) => {
        spliceBlocks(prev);
        return update(prev, {
          $splice: [[pivotIndexes[0], 0, ...auxSplicedBlocks]],
        });
      });
    },
    [setBlocks]
  );

  // We are doing this because we need to get the data of the blocks
  // wihout having to get block data to avoid rerenders
  const getBlocksData = useCallback(
    (blockIndexes: number[]) => {
      const blocks: Block[] = [];
      setBlocks((prevBlocks) => {
        prevBlocks.forEach((block, i) => {
          if (blockIndexes.includes(i)) blocks.push(block);
        });
        return prevBlocks;
      });
      return blocks;
    },
    [setBlocks]
  );

  const modifyHeaderLevel = useCallback(
    (blockIndex: number, level: 1 | 2 | 3 | 4 | 5 | 6) => {
      setBlocks(
        updateBlocks({
          [blockIndex]: {
            data: { level: { $set: level } },
          },
        })
      );
    },
    [setBlocks]
  );

  const modifyListStyle = (blockIndex: number, style: 'ordered' | 'unordered') => {
    setBlocks(updateBlocks({ [blockIndex]: { data: { style: { $set: style } } } }));
  };

  return {
    setBlocks,
    insertParagraphBlock,
    removeBlocks,
    splitTextBlock,
    swapBlocks,
    insertBlocks,
    getBlocksData,
    modifyHeaderLevel,
    modifyListStyle,
    updateBlockFields,
  };
};
