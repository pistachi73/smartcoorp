/* eslint-disable @typescript-eslint/no-empty-function */
import { Box } from '@air/react-drag-to-select';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Block } from '../post-editor.types';

type BlockSelectionUpdaterContextProps = {
  setPivotSelectedBlock: Dispatch<SetStateAction<number>>;
  setClipboardBlocks: Dispatch<SetStateAction<Block[]>>;
  setSelectedBlocks: Dispatch<SetStateAction<number[]>>;
  setIsSelectionEnabled: Dispatch<SetStateAction<boolean>>;
};

export const BlockSelectionUpdaterContext =
  createContext<BlockSelectionUpdaterContextProps>({
    setSelectedBlocks: () => {},
    setPivotSelectedBlock: () => {},
    setClipboardBlocks: () => {},
    setIsSelectionEnabled: () => {},
  });

type BlockSelectionConsumerContextResult = {
  pivotSelectedBlock: number;
  selectedBlocks: number[];
  clipboardBlocks: Block[];
  isSelectionEnabled: boolean;
};
export const BlockSelectionConsumerContext =
  createContext<BlockSelectionConsumerContextResult>({
    selectedBlocks: [],
    isSelectionEnabled: true,
    pivotSelectedBlock: 0,
    clipboardBlocks: [],
  });

export const BlockSelectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSelectionEnabled, setIsSelectionEnabled] = useState(true);
  const [selectedBlocks, setSelectedBlocks] = useState<number[]>([]);
  const [pivotSelectedBlock, setPivotSelectedBlock] = useState<number>(0);
  const [clipboardBlocks, setClipboardBlocks] = useState<Block[]>([]);

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
    [
      setSelectedBlocks,
      setPivotSelectedBlock,
      setClipboardBlocks,
      setIsSelectionEnabled,
    ]
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
    throw new Error(
      'useBlockSelectionUpdaterContext must be used within a BlockSelectionProvider'
    );
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
