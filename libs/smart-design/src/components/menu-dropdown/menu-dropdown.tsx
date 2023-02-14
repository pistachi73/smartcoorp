import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { FC } from 'react';

import { Button } from '../button/button';

import * as StyledDropdownMenu from './menu-dropdown.styles';
import { MenuDropdownProps } from './menu-dropdown.types';
export const MenuDropdown: FC<MenuDropdownProps> = ({
  children,
  noMargin,
  rootProps,
  contentProps = {
    sideOffset: 5,
    side: 'bottom',
    align: 'start',
  },
  ...props
}) => (
  <DropdownMenu.Root {...rootProps}>
    <DropdownMenu.Trigger>
      <Button>Hello</Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <StyledDropdownMenu.Content
        animate={{ scale: 1 }}
        initial={{ scale: 0.9 }}
        {...contentProps}
      >
        <input
          id="test"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.stopPropagation()
          }
        />
        <StyledDropdownMenu.Item>Hello</StyledDropdownMenu.Item>
        <StyledDropdownMenu.Item>Hello</StyledDropdownMenu.Item>
        <StyledDropdownMenu.Item>Hello</StyledDropdownMenu.Item>
        <StyledDropdownMenu.Item>Hello</StyledDropdownMenu.Item>
        <StyledDropdownMenu.Item>Hello</StyledDropdownMenu.Item>
        <StyledDropdownMenu.Item>Hello</StyledDropdownMenu.Item>
        <StyledDropdownMenu.Item>Hello</StyledDropdownMenu.Item>
      </StyledDropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

MenuDropdown.displayName = 'MenuDropdown';
