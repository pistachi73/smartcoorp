import { WritableDraft } from 'immer/dist/internal';

import { ObjectEntries } from '@smartcoorp/smart-types';

import { ColumnBlock } from '../../../post-editor.types';
import type { BlockChainDB } from '../blocks-context.types';

import type { BlocksDBReducerState, ToAddBlock } from './blocks-reducer.types';

export const removeBlocks = (
  draft: WritableDraft<BlocksDBReducerState>,
  blocksData: [string, string][]
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

  ObjectEntries(blocksToBeRemovedFromChains).forEach(([chainId, blockIds]) => {
    if (draft.chains[chainId].length === blockIds.length) {
      removedChainIds.add(chainId);
    }
  });

  // GET COLUMN BLOCKS TO BE REMOVED
  removedChainIds.forEach((chainId) => {
    const columnBlockId = chainId.split('-')[0];
    const columnBlock = draft.blocks[columnBlockId] as ColumnBlock;

    const columnBlockToBeRemoved = columnBlock.data.chains.every((chainId) =>
      removedChainIds.has(chainId)
    );

    if (!columnBlockToBeRemoved) return;

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
  });

  ObjectEntries(blocksToBeRemovedFromChains).forEach(([chainId, blockIds]) => {
    if (draft.chains[chainId].length === blockIds.length) {
      removedChainIds.add(chainId);
    }
  });

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

  ObjectEntries(draft.blocks).forEach(([blockId, block]) => {
    if (block.type !== 'columns') return;
    const isModified = block.data.chains.some((id) => removedChainIds.has(id));
    if (!isModified) return;

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
  });
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
