import React, { useEffect } from 'react';

import { UseMenu, useMenu } from '../../menu';

const BlockMenuToolContext = React.createContext<{
  addBlockMenuProps?: UseMenu;
  modifyBlockMenuProps?: UseMenu;
}>({});

export const BlockMenuToolProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { ...addBlockMenuProps } = useMenu({ id: 'add-block-tool' });
  const { ...modifyBlockMenuProps } = useMenu({ id: 'block-type-tool' });

  return (
    <BlockMenuToolContext.Provider
      value={{ addBlockMenuProps, modifyBlockMenuProps }}
    >
      {children}
    </BlockMenuToolContext.Provider>
  );
};

export const useBlockMenu = (): {
  isMenuOpened: boolean;
  addBlockMenuProps: UseMenu;
  modifyBlockMenuProps: UseMenu;
} => {
  const { addBlockMenuProps, modifyBlockMenuProps } =
    React.useContext(BlockMenuToolContext);

  if (
    typeof addBlockMenuProps === 'undefined' ||
    typeof modifyBlockMenuProps === 'undefined'
  ) {
    throw new Error('useBlockMenu must be used within a BlockMenuToolProvider');
  }
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);

  useEffect(() => {
    if (addBlockMenuProps?.isOpen || modifyBlockMenuProps?.isOpen) {
      setIsMenuOpened(true);
    } else {
      setIsMenuOpened(false);
    }
  }, [addBlockMenuProps?.isOpen, modifyBlockMenuProps?.isOpen]);

  return { isMenuOpened, addBlockMenuProps, modifyBlockMenuProps };
};
