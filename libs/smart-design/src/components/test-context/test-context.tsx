import React, { memo, useState } from 'react';

type TestContextProps = {
  [key: string]: any;
};

type ToolProps = any;
const Context = React.createContext<TestContextProps>({});
const ToolContext = React.createContext<ToolProps>(null);
const ToolUpdaterContext = React.createContext<ToolProps>(null);

const ContextProvider = ({ children }) => {
  const [tool, setTool] = useState('tool');

  return (
    <ToolContext.Provider value={tool}>
      <ToolUpdaterContext.Provider value={setTool}>
        {children}
      </ToolUpdaterContext.Provider>
    </ToolContext.Provider>
  );
};

const BlockProvider = ({ children }) => {
  const [block, setBlock] = useState(['block1', 'block2']);

  return (
    <Context.Provider value={{ block, setBlock }}>{children}</Context.Provider>
  );
};

function useTool() {
  const tool = React.useContext(ToolContext);
  if (typeof tool === 'undefined') {
    throw new Error('useTool must be used within a CountProvider');
  }
  return tool;
}

function useUpdateTool() {
  const setTool = React.useContext(ToolUpdaterContext);
  if (typeof setTool === 'undefined') {
    throw new Error('useUpdateTool must be used within a CountProvider');
  }
  return setTool;
}

export const TestContext = () => {
  return (
    <ContextProvider>
      <BlockProvider>
        <ToolConsumer />
        <ToolUpdater />
        <Blocks />
        <UpdateBlocks />
      </BlockProvider>
    </ContextProvider>
  );
};

const ToolConsumer = () => {
  console.log('render tool consumer');
  const tool = useTool();

  return <div>tool</div>;
};

const ToolUpdater = () => {
  console.log('render tool updater');
  const setTool = useUpdateTool();

  return <button onClick={() => setTool('change')}> change tool</button>;
};

const Blocks = () => {
  console.log('render blocks');
  const { block, setBlock } = React.useContext(Context);
  return (
    <div>
      {block.map((b) => (
        <Block key={b} block={b} />
      ))}
    </div>
  );
};

const Block = memo(({ block }) => {
  console.log('render block', block);
  return <div>{block}</div>;
});

const UpdateBlocks = () => {
  const { block, setBlock } = React.useContext(Context);

  return (
    <button onClick={() => setBlock([...block, 'block3'])}>
      {' '}
      change blocks
    </button>
  );
};
