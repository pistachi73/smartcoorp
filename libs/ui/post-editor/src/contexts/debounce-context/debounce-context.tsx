import React from 'react';

export const DebounceContext = React.createContext<{
  debounceTime: number;
}>({
  debounceTime: 300,
});

export const DebounceProvider = ({
  children,
  debounceTime,
}: {
  children: React.ReactNode;
  debounceTime: number;
}) => {
  const value = React.useMemo(
    () => ({
      debounceTime,
    }),
    [debounceTime]
  );

  return (
    <DebounceContext.Provider value={value}>
      {children}
    </DebounceContext.Provider>
  );
};

export const useDebounceContext = () => {
  const context = React.useContext(DebounceContext);

  if (context === undefined) {
    throw new Error(
      `useDebounceContext must be used within a DebounceProvider`
    );
  }

  return context;
};
