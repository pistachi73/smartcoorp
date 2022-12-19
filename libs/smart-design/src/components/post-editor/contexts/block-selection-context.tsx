/* eslint-disable @typescript-eslint/no-empty-function */
import { Box } from '@air/react-drag-to-select';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
  useRef,
  useState,
} from 'react';

type BlockSelectionContextResult = {
  centerSelectedBlock: number;
  setCenterSelectedBlock: Dispatch<SetStateAction<number>>;
  selectedBlocks: number[];
  setSelectedBlocks: Dispatch<SetStateAction<number[]>>;
  isSelectionEnabled: boolean;
  setIsSelectionEnabled: Dispatch<SetStateAction<boolean>>;
  selectableBlocks: MutableRefObject<Box[]>;
};

export const BlockSelectionContext = createContext<BlockSelectionContextResult>(
  {
    selectedBlocks: [],
    selectableBlocks: { current: [] },
    isSelectionEnabled: true,
    centerSelectedBlock: 0,
    setCenterSelectedBlock: () => {},
    setSelectedBlocks: () => {},
    setIsSelectionEnabled: () => {},
  }
);

export const BlockSelectionProvider = ({
  children,
}: {
  children: React.ReactNode;
  containerRef?: HTMLDivElement | null;
}) => {
  // const [selectionBox, setSelectionBox] = useState<Box>();
  const [isSelectionEnabled, setIsSelectionEnabled] = useState(true);
  const [selectedBlocks, setSelectedBlocks] = useState<number[]>([]);
  const [centerSelectedBlock, setCenterSelectedBlock] = useState<number>(0);
  const selectableBlocks = useRef<Box[]>([]);

  return (
    <BlockSelectionContext.Provider
      value={{
        selectedBlocks,
        selectableBlocks,
        isSelectionEnabled,
        centerSelectedBlock,
        setCenterSelectedBlock,
        setSelectedBlocks,
        setIsSelectionEnabled,
      }}
    >
      {children}
    </BlockSelectionContext.Provider>
  );
};
