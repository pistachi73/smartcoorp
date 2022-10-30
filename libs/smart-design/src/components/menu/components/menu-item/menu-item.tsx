import React from 'react';

import Link from 'next/link';

import { Styled } from './menu-item.styles';
import { MenuItemProps } from './menu-item.types';

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  to,
  disabled,
}) => {
  const tabIndex = disabled ? { tabIndex: -1 } : {};
  return (
    <Styled.MenuItem>
      <Link href={to} passHref>
        <Styled.Link role="menuitem" $disabled={disabled} {...tabIndex}>
          {children}
        </Styled.Link>
      </Link>
    </Styled.MenuItem>
  );
};
