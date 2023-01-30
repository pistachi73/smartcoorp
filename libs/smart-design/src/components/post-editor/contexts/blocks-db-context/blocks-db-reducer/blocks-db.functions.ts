import type { WritableDraft } from 'immer/dist/internal';

import type { BlockChainDB } from '../blocks-db.types';

import { BlocksDBAction } from './blocks-db-reducer.types';
import type {
  BlocksDBReducerState,
  ToAddBlock,
} from './blocks-db-reducer.types';

export const removeBlocks = (
  draft: WritableDraft<BlocksDBReducerState>,
  blocksData: [string, string][]
) => {
  if (!blocksData.length) return;

  const blockIds = blocksData.map(([blockId, _]) => blockId);
  const blocksToBeRemovedFromChains: BlockChainDB = {};

  blocksData.forEach((blockData) => {
    const [blockId, chainId] = blockData;

    if (!blocksToBeRemovedFromChains[chainId]) {
      blocksToBeRemovedFromChains[chainId] = [];
    }

    blocksToBeRemovedFromChains[chainId].push(blockId);
  });

  blockIds.forEach((id) => delete draft.blocks[id]);
  Object.keys(blocksToBeRemovedFromChains).forEach((chainId) => {
    draft.chains[chainId] = draft.chains[chainId].filter(
      (blockId) => !blockIds.includes(blockId)
    );
  });
};

export const addBlocks = (
  draft: WritableDraft<BlocksDBReducerState>,
  blocksData: ToAddBlock[]
) => {
  blocksData.forEach(([block, chainId, position]) => {
    draft.blocks[block.id] = block;
    draft.chains[chainId].splice(position, 0, block.id);
  });
};
