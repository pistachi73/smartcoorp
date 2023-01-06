import React from 'react';

import { Command } from './commands.types';

export const CommandsContext = React.createContext<{
  commands: React.MutableRefObject<Command[]>;
  step: React.MutableRefObject<number>;
}>({ commands: { current: [] }, step: { current: -1 } });

export const CommandsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const commands = React.useRef<Command[]>([]);
  const step = React.useRef(-1);

  const value = React.useMemo(() => ({ commands, step }), [commands, step]);

  return (
    <CommandsContext.Provider value={value}>
      {children}
    </CommandsContext.Provider>
  );
};
