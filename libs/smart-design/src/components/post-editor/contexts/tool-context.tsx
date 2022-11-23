/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import { BlockType } from '../post-editor.types';

type ToolProps = {
  blockIndex: number;
  type: BlockType;
};

const ToolConsumerContext = React.createContext<ToolProps | null>(null);
const ToolUpdaterContext = React.createContext<
  React.Dispatch<React.SetStateAction<ToolProps | null>>
>(() => {});

export const ToolProvider = ({ children }: { children: React.ReactNode }) => {
  const [tool, setTool] = React.useState<ToolProps | null>(null);

  return (
    <ToolConsumerContext.Provider value={tool}>
      <ToolUpdaterContext.Provider value={setTool}>
        {children}
      </ToolUpdaterContext.Provider>
    </ToolConsumerContext.Provider>
  );
};

export const useTool = () => {
  const tool = React.useContext(ToolConsumerContext);
  if (typeof tool === 'undefined') {
    throw new Error('useTool must be used within a ToolProvider');
  }
  return tool;
};

export const useUpdateTool = () => {
  const setTool = React.useContext(ToolUpdaterContext);
  if (typeof setTool === 'undefined') {
    throw new Error('useUpdateTool must be used within a ToolProvider');
  }

  return setTool;
};
