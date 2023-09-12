import React from 'react';

export const UtilContext = React.createContext<{
  debounceTime: number;
  viewBlocks?: boolean;
}>({
  debounceTime: 300,
  viewBlocks: false,
});

const UtilsUpdaterContext = React.createContext<
  | {
      setViewBlocks: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export const UtilProvider = ({
  children,
  debounceTime,
}: {
  children: React.ReactNode;
  debounceTime: number;
}) => {
  const [viewBlocks, setViewBlocks] = React.useState(false);

  const value = React.useMemo(
    () => ({
      debounceTime,
      viewBlocks,
    }),
    [debounceTime, viewBlocks]
  );

  return (
    <UtilContext.Provider value={value}>
      <UtilsUpdaterContext.Provider value={{ setViewBlocks }}>
        {children}
      </UtilsUpdaterContext.Provider>
    </UtilContext.Provider>
  );
};

export const useUtilsUpdaterContext = () => {
  const context = React.useContext(UtilsUpdaterContext);

  if (typeof context === 'undefined') {
    throw new Error(
      'useUtilsUpdaterContext must be used within a UtilProvider'
    );
  }
  return context;
};

export const useUtilContext = () => {
  const context = React.useContext(UtilContext);

  if (context === undefined) {
    throw new Error(`useUtilContext must be used within a UtilProvider`);
  }

  return context;
};
