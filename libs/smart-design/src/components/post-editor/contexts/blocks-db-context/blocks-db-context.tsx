/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useReducer } from 'react';

import { BlocksDBAction, BlocksDBReducerState } from './blocks-db-reducer';
import { blocksDBReducer } from './blocks-db-reducer/blocks-db-reducer';
import { BlocksDB } from './blocks-db.types';

type BlockDataDBContextProps = {
  children: React.ReactNode;
  blocksDB: BlocksDB;
  setBlocksDB: any;
};

const BlocksDBConsumerContext = React.createContext<BlocksDBReducerState>({
  blocks: {},
  chains: {},
  canRedo: false,
  canUndo: false,
});

const BlocksDBUpdaterContext = React.createContext<
  React.Dispatch<BlocksDBAction>
>(() => {});

export const BlocksDBProvider = ({
  children,
  blocksDB: initialBlocksDB,
  setBlocksDB,
}: BlockDataDBContextProps) => {
  const [blocksDB, dispatchBlocksDB] = useReducer(blocksDBReducer, {
    ...initialBlocksDB,
    canRedo: false,
    canUndo: false,
  });

  return (
    <BlocksDBConsumerContext.Provider value={blocksDB}>
      <BlocksDBUpdaterContext.Provider value={dispatchBlocksDB}>
        {children}
      </BlocksDBUpdaterContext.Provider>
    </BlocksDBConsumerContext.Provider>
  );
};

export const useBlocksDBConsumerContext = () => {
  const blocksDB = React.useContext(BlocksDBConsumerContext);

  if (typeof blocksDB === 'undefined') {
    throw new Error(
      'useBlocksDBConsumerContext must be used within a BlockDataDBProvider'
    );
  }
  return blocksDB;
};

export const useBlocksDBUpdaterContext = () => {
  const dispatchBlocksDB = React.useContext(BlocksDBUpdaterContext);

  if (typeof dispatchBlocksDB === 'undefined') {
    throw new Error(
      'useBlocksDBUpdaterContext must be used within a BlockDataDBProvider'
    );
  }

  return dispatchBlocksDB;
};
