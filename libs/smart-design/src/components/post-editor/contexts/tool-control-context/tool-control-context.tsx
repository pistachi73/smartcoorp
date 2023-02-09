/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo } from 'react';

const ToolControlContext = React.createContext<{
  isAddBlockMenuOpened: boolean;
  isModifyBlockMenuOpened: boolean;
  setIsAddBlockMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModifyBlockMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isAddBlockMenuOpened: false,
  isModifyBlockMenuOpened: false,
  setIsAddBlockMenuOpened: () => {},
  setIsModifyBlockMenuOpened: () => {},
});

const ToolBlockIndexUpdaterContext = React.createContext<
  React.Dispatch<React.SetStateAction<number | null>>
>(() => {});
const ToolBlockIndexConsumerContext = React.createContext<number | null>(null);

export const ToolControlProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAddBlockMenuOpened, setIsAddBlockMenuOpened] = React.useState(false);
  const [isModifyBlockMenuOpened, setIsModifyBlockMenuOpened] =
    React.useState(false);
  const [toolBlockIndex, setToolBlockIndex] = React.useState<number | null>(
    null
  );

  const toolControlValue = useMemo(
    () => ({
      isAddBlockMenuOpened,
      isModifyBlockMenuOpened,
      setIsAddBlockMenuOpened,
      setIsModifyBlockMenuOpened,
    }),
    [
      isAddBlockMenuOpened,
      isModifyBlockMenuOpened,
      setIsAddBlockMenuOpened,
      setIsModifyBlockMenuOpened,
    ]
  );
  return (
    <ToolControlContext.Provider value={toolControlValue}>
      <ToolBlockIndexUpdaterContext.Provider value={setToolBlockIndex}>
        <ToolBlockIndexConsumerContext.Provider value={toolBlockIndex}>
          {children}
        </ToolBlockIndexConsumerContext.Provider>
      </ToolBlockIndexUpdaterContext.Provider>
    </ToolControlContext.Provider>
  );
};

export const useToolControlContext = () => {
  const context = React.useContext(ToolControlContext);

  if (typeof context === 'undefined') {
    throw new Error(
      'useToolControlContext must be used within a ToolControlProvider'
    );
  }

  return context;
};

export const useToolBlockIndexUpdaterContext = () => {
  const setToolBlockIndex = React.useContext(ToolBlockIndexUpdaterContext);

  if (typeof setToolBlockIndex === 'undefined') {
    throw new Error(
      'useToolBlockIndexUpdaterContext must be used within a ToolControlProvider'
    );
  }

  return setToolBlockIndex;
};

export const useToolBlockIndexConsumerContext = () => {
  const toolBlockIndex = React.useContext(ToolBlockIndexConsumerContext);

  if (typeof toolBlockIndex === 'undefined') {
    throw new Error(
      'useToolBlockIndexConsumerContext must be used within a ToolControlProvider'
    );
  }

  return toolBlockIndex;
};
