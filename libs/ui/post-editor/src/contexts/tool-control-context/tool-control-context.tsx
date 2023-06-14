/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo } from 'react';

const ToolControlConsumerContext = React.createContext<{
  isAddBlockMenuOpened: boolean;
  isModifyBlockMenuOpened: boolean;
}>({
  isAddBlockMenuOpened: false,
  isModifyBlockMenuOpened: false,
});
const ToolControlUpdaterContext = React.createContext<{
  setIsAddBlockMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModifyBlockMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
}>({
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

  const toolControlConsumerValue = useMemo(
    () => ({
      isAddBlockMenuOpened,
      isModifyBlockMenuOpened,
    }),
    [isAddBlockMenuOpened, isModifyBlockMenuOpened]
  );

  const toolControlUpdaterValue = useMemo(
    () => ({
      setIsAddBlockMenuOpened,
      setIsModifyBlockMenuOpened,
    }),
    [setIsAddBlockMenuOpened, setIsModifyBlockMenuOpened]
  );

  return (
    <ToolControlConsumerContext.Provider value={toolControlConsumerValue}>
      <ToolControlUpdaterContext.Provider value={toolControlUpdaterValue}>
        <ToolBlockIndexUpdaterContext.Provider value={setToolBlockIndex}>
          <ToolBlockIndexConsumerContext.Provider value={toolBlockIndex}>
            {children}
          </ToolBlockIndexConsumerContext.Provider>
        </ToolBlockIndexUpdaterContext.Provider>
      </ToolControlUpdaterContext.Provider>
    </ToolControlConsumerContext.Provider>
  );
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

export const useToolControlConsumerContext = () => {
  const context = React.useContext(ToolControlConsumerContext);

  if (typeof context === 'undefined') {
    throw new Error(
      'useToolControlConsumerContext must be used within a ToolControlProvider'
    );
  }

  return context;
};

export const useToolControlUpdaterContext = () => {
  const context = React.useContext(ToolControlUpdaterContext);

  if (typeof context === 'undefined') {
    throw new Error(
      'useToolControlUpdaterContext must be used within a ToolControlProvider'
    );
  }

  return context;
};
