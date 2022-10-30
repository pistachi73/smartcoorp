import { AnimatePresence } from 'framer-motion';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

import { useActiveElement, useKeyPress } from '../../hooks';
import { Button } from '../button';
import { ClickOutside } from '../click-outside';

import { Styled } from './menu.styles';
import { MenuProps } from './menu.types';

export const Menu: FC<MenuProps> = ({
  className,
  id,
  children,
  triggerProps,
  triggerText,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const activeElement = useActiveElement();

  const closeMenu = useCallback(() => {
    if (!isOpen) setIsOpen(false);
  }, []);

  const toggleMenu = useCallback(
    () => setIsOpen((prevIsOpen) => !prevIsOpen),
    []
  );
  const triggerId = `${id}-trigger`;
  const menuId = `${id}-menu`;

  useEffect(() => {
    if (!isOpen) return;
    const menu: HTMLElement | null = document.getElementById(id);
    if (!menu?.contains(activeElement)) {
      setIsOpen(false);
    }
  }, [activeElement, isOpen, id]);

  useKeyPress('Escape', closeMenu);

  return (
    <ClickOutside id={id} callback={closeMenu}>
      <Styled.MenuWrapper className={className}>
        <Button
          id={triggerId}
          icon={isOpen ? IoChevronUpOutline : IoChevronDownOutline}
          size="medium"
          iconSize={18}
          iconAfter
          variant="text"
          {...triggerProps}
          onClick={toggleMenu}
          aria-controls={menuId}
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          {triggerText}
        </Button>
        <AnimatePresence>
          {isOpen && (
            <Styled.MenuContainer
              id={menuId}
              role="menu"
              aria-label={triggerId}
              aria-hidden={!isOpen}
              initial={{ scale: 0.95, opacity: 0.85 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.24, ease: [0, 0, 0.2, 1] }}
            >
              {children}
            </Styled.MenuContainer>
          )}
        </AnimatePresence>
      </Styled.MenuWrapper>
    </ClickOutside>
  );
};

Menu.displayName = 'Menu';
