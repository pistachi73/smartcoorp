import { Block } from '../../post-editor.types';

export type BlockDataDB = {
  [id: string]: Block;
};

export type BlockChainDB = {
  [chainId: string]: string[];
};

export type BlocksDB = {
  blocks: BlockDataDB;
  chains: BlockChainDB;
};
