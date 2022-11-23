import { AnimatePresence } from 'framer-motion';
import React, { FC, useCallback, useEffect } from 'react';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

import { Button } from '../button';

import { Styled } from './menu.styles';
import { MenuProps } from './menu.types';

export const Menu: FC<MenuProps> = ({
  className,
  id,
  children,
  closeMenu,
  toggleMenu,
  isOpen,
  triggerProps,
  triggerText,
  refs,
}) => {
  const [_, setCursor] = React.useState(-1);
  const triggerId = `${id}-trigger`;
  const menuId = `${id}-menu`;

  const handleBlur = useCallback(
    (e: React.FocusEvent) => {
      const target = e.currentTarget as HTMLElement;
      requestAnimationFrame(() => {
        if (!target.contains(document.activeElement)) {
          closeMenu();
          setCursor(-1);
        }
      });
    },
    [closeMenu]
  );

  useEffect(() => {
    if (!isOpen) setCursor(-1);
  }, [isOpen]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeMenu();
    }

    if (!refs.current) return;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setCursor((prevCursor) => {
        const nextCursor =
          (((prevCursor - 1) % refs.current.length) + refs.current.length) %
          refs.current.length;
        refs.current[nextCursor]?.focus();
        return nextCursor;
      });
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'Tab') {
      e.preventDefault();
      setCursor((prevCursor) => {
        const nextCursor = (prevCursor + 1) % refs.current.length;
        refs.current[nextCursor]?.focus();
        return nextCursor;
      });
    }
  };

  return (
    <Styled.MenuWrapper
      className={className}
      onBlur={handleBlur}
      onKeyDown={handleKeyPress}
    >
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
  );
};
