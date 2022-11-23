import React from 'react';

import { Styled } from './menu-item.styles';
import { MenuItemProps } from './menu-item.types';

export const MenuItem = React.forwardRef(
  (
    { children, className, disabled, ...props }: MenuItemProps,
    ref?: React.Ref<HTMLElement>
  ) => {
    const tabIndex = disabled ? { tabIndex: -1 } : {};

    return (
      <Styled.MenuItemContainer>
        <Styled.MenuItem
          ref={ref}
          className={className}
          role="menuitem"
          $disabled={disabled}
          {...tabIndex}
          {...props}
        >
          {children}
        </Styled.MenuItem>
      </Styled.MenuItemContainer>
    );
  }
);
