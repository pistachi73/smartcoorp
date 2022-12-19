import React from 'react';

export const RefsContext = React.createContext<any>([]);

export const RefsProvider = ({ children }: { children: React.ReactNode }) => {
  const refs = React.useRef<any>([]);

  return <RefsContext.Provider value={refs}>{children}</RefsContext.Provider>;
};
