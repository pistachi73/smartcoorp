/* eslint-disable @typescript-eslint/no-empty-function */
import { Dispatch, SetStateAction, createContext, useContext, useMemo, useState } from 'react';

import type { BlockDataDB } from '../blocks-db-context';

type BlockSelectionUpdaterContextProps = {
  setPivotSelectedBlock: Dispatch<SetStateAction<number>>;
  setClipboardBlocks: Dispatch<SetStateAction<BlockDataDB | null>>;
  setSelectedBlocks: Dispatch<SetStateAction<number[]>>;
  setIsSelectionEnabled: Dispatch<SetStateAction<boolean>>;
};

export const BlockSelectionUpdaterContext = createContext<BlockSelectionUpdaterContextProps>({
  setSelectedBlocks: () => {},
  setPivotSelectedBlock: () => {},
  setClipboardBlocks: () => {},
  setIsSelectionEnabled: () => {},
});

type BlockSelectionConsumerContextResult = {
  pivotSelectedBlock: number;
  selectedBlocks: number[];
  clipboardBlocks: BlockDataDB | null;
  isSelectionEnabled: boolean;
};
export const BlockSelectionConsumerContext = createContext<BlockSelectionConsumerContextResult>({
  selectedBlocks: [],
  isSelectionEnabled: true,
  pivotSelectedBlock: 0,
  clipboardBlocks: null,
});

export const BlockSelectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSelectionEnabled, setIsSelectionEnabled] = useState(true);
  const [selectedBlocks, setSelectedBlocks] = useState<number[]>([]);
  const [pivotSelectedBlock, setPivotSelectedBlock] = useState<number>(0);
  const [clipboardBlocks, setClipboardBlocks] = useState<BlockDataDB | null>(null);

  const consumerValue = useMemo(
    () => ({
      selectedBlocks,
      isSelectionEnabled,
      pivotSelectedBlock,
      clipboardBlocks,
    }),
    [selectedBlocks, isSelectionEnabled, pivotSelectedBlock, clipboardBlocks]
  );

  const updaterValue = useMemo(
    () => ({
      setSelectedBlocks,
      setPivotSelectedBlock,
      setClipboardBlocks,
      setIsSelectionEnabled,
    }),
    [setSelectedBlocks, setPivotSelectedBlock, setClipboardBlocks, setIsSelectionEnabled]
  );
  return (
    <BlockSelectionConsumerContext.Provider value={consumerValue}>
      <BlockSelectionUpdaterContext.Provider value={updaterValue}>
        {children}
      </BlockSelectionUpdaterContext.Provider>
    </BlockSelectionConsumerContext.Provider>
  );
};

export const useBlockSelectionUpdaterContext = () => {
  const context = useContext(BlockSelectionUpdaterContext);
  if (typeof context === 'undefined') {
    throw new Error('useBlockSelectionUpdaterContext must be used within a BlockSelectionProvider');
  }
  return context;
};

export const useBlockSelectionConsumerContext = () => {
  const context = useContext(BlockSelectionConsumerContext);
  if (typeof context === 'undefined') {
    throw new Error(
      'useBlockSelectionConsumerContext must be used within a BlockSelectionProvider'
    );
  }
  return context;
};
