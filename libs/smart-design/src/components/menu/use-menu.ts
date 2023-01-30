import { useCallback, useRef, useState } from 'react';

type UseMenuProps = {
  id: string;
};

export type UseMenu = {
  id: string;
  isOpen: boolean;
  closeMenu: () => void;
  toggleMenu: () => void;
  refs?: any;
};

export const useMenu = ({ id }: UseMenuProps): UseMenu => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const refs = useRef<any>([]);
  const closeMenu = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);

  const toggleMenu = useCallback(() => setIsOpen((prevIsOpen) => !prevIsOpen), []);

  return {
    isOpen,
    toggleMenu,
    closeMenu,
    id,
    refs,
  };
};
