import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as React from 'react';

import * as StyledDropdownMenu from './menu-dropdown.styles';

export type MenuDropdownProps = {
  /** Content of the hero */
  children: React.ReactNode;
  /** Remove margin-bottom */
  noMargin?: boolean;
  rootProps: React.ComponentProps<typeof DropdownMenu.Root>;
  contentProps: React.ComponentProps<typeof StyledDropdownMenu.Content> &
    React.ComponentProps<typeof DropdownMenu.Content>;
};
