import React from 'react';

export const UtilContext = React.createContext<{
  debounceTime: number;
  viewBlocks?: boolean;
  hasMaxImages: {
    hasMaxImages: boolean;
    maxImages: number;
    numberOfImageBlocks: number;
  };
}>({
  debounceTime: 300,
  viewBlocks: false,
  hasMaxImages: {
    hasMaxImages: false,
    maxImages: 5,
    numberOfImageBlocks: 0,
  },
});

const UtilsUpdaterContext = React.createContext<
  | {
      setViewBlocks: React.Dispatch<React.SetStateAction<boolean>>;
      setHasMaxImages: React.Dispatch<
        React.SetStateAction<{
          hasMaxImages: boolean;
          maxImages: number;
          numberOfImageBlocks: number;
        }>
      >;
    }
  | undefined
>(undefined);

export const UtilProvider = ({
  children,
  debounceTime,
  maxImages,
}: {
  children: React.ReactNode;
  debounceTime: number;
  maxImages?: number;
}) => {
  const [viewBlocks, setViewBlocks] = React.useState(false);
  const [hasMaxImages, setHasMaxImages] = React.useState({
    hasMaxImages: false,
    maxImages: maxImages ?? 5,
    numberOfImageBlocks: 0,
  });

  const value = React.useMemo(
    () => ({
      debounceTime,
      viewBlocks,
      hasMaxImages,
    }),
    [debounceTime, viewBlocks, hasMaxImages]
  );

  return (
    <UtilContext.Provider value={value}>
      <UtilsUpdaterContext.Provider value={{ setViewBlocks, setHasMaxImages }}>
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
