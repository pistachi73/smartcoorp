import { original } from 'immer';
import { WritableDraft } from 'immer/dist/internal';

import { ObjectEntries } from '@smartcoorp/smart-types';

import { isColumnBlock } from '../../../types/blog-guards.types';
import type { BlockChainDB } from '../blocks-context.types';

import type { BlocksDBReducerState, ToAddBlock } from './blocks-reducer.types';
const MAX_DEEP_LEVEL = 3;

export const removeBlocks = async (
  draft: WritableDraft<BlocksDBReducerState>,
  /**[blockId, chainId] */
  blocksData: [string, string][],
  blockParagraphAdded = false
) => {
  if (!blocksData.length) return;

  const removedBlockIds = new Set<string>();
  const modifiedChainIds = new Set<string>();
  const removedChainIds = new Set<string>();
  const blocksToBeRemovedFromChains: BlockChainDB = {};

  blocksData.forEach(([blockId, chainId]) => {
    if (!blocksToBeRemovedFromChains[chainId]) {
      blocksToBeRemovedFromChains[chainId] = [];
    }

    removedBlockIds.add(blockId);
    modifiedChainIds.add(chainId);

    blocksToBeRemovedFromChains[chainId].push(blockId);
  });

  // GET CHAINS TO BE REMOVED
  ObjectEntries(blocksToBeRemovedFromChains).forEach(([chainId, blockIds]) => {
    if (draft.chains[chainId].length === blockIds.length) {
      removedChainIds.add(chainId);
    }
  });

  // GET COLUMN BLOCKS TO BE REMOVED
  // We need to check if the column block is empty after removing the blocks
  for (const x of Array(MAX_DEEP_LEVEL).keys()) {
    for (const chainId of removedChainIds) {
      const columnBlockId = chainId.split('-')[0];

      const columnBlock = draft.blocks[columnBlockId];

      if (!isColumnBlock(columnBlock)) continue;

      const columnBlockToBeRemoved = columnBlock.data.chains?.every((chainId) =>
        removedChainIds.has(chainId)
      );

      if (!columnBlockToBeRemoved) continue;

      removedBlockIds.add(columnBlockId);
      modifiedChainIds.add(columnBlock.chainId);

      if (!blocksToBeRemovedFromChains[columnBlock.chainId]) {
        blocksToBeRemovedFromChains[columnBlock.chainId] = [];
      }

      if (
        blocksToBeRemovedFromChains[columnBlock.chainId].indexOf(
          columnBlockId
        ) === -1
      ) {
        blocksToBeRemovedFromChains[columnBlock.chainId].push(columnBlockId);
      }
    }
    ObjectEntries(blocksToBeRemovedFromChains).forEach(
      ([chainId, blockIds]) => {
        if (draft.chains[chainId].length === blockIds.length) {
          removedChainIds.add(chainId);
        }
      }
    );
  }

  removedChainIds.forEach((id) => {
    delete draft.chains[id];
    modifiedChainIds.delete(id);
  });

  removedBlockIds.forEach((id) => delete draft.blocks[id]);

  modifiedChainIds.forEach(
    (id) =>
      (draft.chains[id] = draft.chains[id].filter(
        (blockId) => !removedBlockIds.has(blockId)
      ))
  );

  const entries = ObjectEntries(draft.blocks);

  for (const [blockId, block] of entries) {
    if (block.type !== 'columns') continue;
    const isModified = block.data.chains.some((id) => removedChainIds.has(id));
    if (!isModified) continue;

    const numberOfCols = block.data.chains.length;

    const numberOfRemovedCols = block.data.chains.reduce((acc, chainId) => {
      if (removedChainIds.has(chainId)) return acc + 1;
      return acc;
    }, 0);

    if (numberOfCols - numberOfRemovedCols === 1) {
      const remainingChainIndex = block.data.chains.findIndex(
        (id) => !removedChainIds.has(id)
      );

      const otherChainId = block.data.chains[remainingChainIndex];
      const otherChain = draft.chains[otherChainId];
      const columnBlockChainIndex =
        draft.chains[block.chainId].indexOf(blockId);

      otherChain.forEach((id) => {
        const block_ = draft.blocks[id];
        block_.chainId = block.chainId.replace(otherChainId, block.chainId);
      });

      draft.chains[block.chainId].splice(
        columnBlockChainIndex,
        1,
        ...otherChain
      );

      delete draft.chains[otherChainId];
      delete draft.blocks[blockId];
    } else {
      block.data.chains = block.data.chains.filter(
        (id) => !removedChainIds.has(id)
      );
    }
  }

  if (
    !blockParagraphAdded &&
    removedBlockIds.size === Object.keys(original(draft)!.blocks).length
  ) {
    draft.chains = {
      main: ['placeholder'],
    };
    draft.blocks = {
      placeholder: {
        id: 'placeholder',
        type: 'paragraph',
        data: {
          text: 'Start writing your post...',
        },
        chainId: 'main',
      },
    };
  }
};

export const addBlocks = (
  draft: WritableDraft<BlocksDBReducerState>,
  blocksData: ToAddBlock[]
) => {
  blocksData.forEach(([block, chainId, position]) => {
    draft.blocks[block.id] = block;
    if (!draft.chains[chainId]) draft.chains[chainId] = [];

    draft.chains[chainId].splice(position, 0, block.id);
  });
};
