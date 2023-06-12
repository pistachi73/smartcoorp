import { Meta, StoryFn } from '@storybook/react';

import { Button } from '../button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { DropdownMenuProps } from './dropdown-menu.types';

export default {
  title: 'Component/Dropdown Menu',
  component: DropdownMenu,
  parameters: {
    largerStory: true,

    docs: {
      description: {
        component:
          'A dropdown menu in React is a user interface component that displays a list of selectable options when triggered by the user. It simplifies the creation and management of dropdown menus, providing customizable features and event handling capabilities. It enhances user experience by offering organized and intuitive navigation or selection options.',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as Meta<DropdownMenuProps>;

const Template: StoryFn<DropdownMenuProps> = (args: any) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Item</DropdownMenuItem>
        <DropdownMenuLabel>Label</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Keyboard shortcuts</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem disabled>
          <span>Disabled</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Invite users</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <span>Email</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Message</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>More...</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Default = {
  render: Template,
};
