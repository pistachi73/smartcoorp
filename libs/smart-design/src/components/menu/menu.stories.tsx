import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Primary,
  Source,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { MenuDivider } from './components';
import { MenuItem } from './components/menu-item/menu-item';
import { Menu as MenuComponent } from './menu';
import { useMenu } from './use-menu';

export default {
  title: 'Component/Menu',
  component: MenuComponent,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Menu</Title>
          <Subtitle>Navigate Menu component</Subtitle>
          <Description>##Overview</Description>
          <Description>
            `Menu` component is used as a navigation popover component
          </Description>
          <Description>##Usage</Description>
          <Source
            language="tsx"
            code={`import { Menu } from @smart-design/components`}
          />
          <Description>###Example</Description>

          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories title="References" />
        </>
      ),
    },
  },
  argTypes: {
    children: { type: 'symbol' },
  },
} as Meta<typeof MenuComponent>;

const Template: StoryFn<typeof MenuComponent> = (args, context) => {
  const { storyId } = context;
  const { ...menuProps } = useMenu({ id: `story${storyId}_${args.id}` });
  return <MenuComponent {...args} {...menuProps} />;
};

export const Menu = {
  render: Template,

  args: {
    children: (
      <>
        <MenuItem to="test">Categoria 1</MenuItem>
        <MenuItem to="test">Teachers</MenuItem>
        <MenuDivider></MenuDivider>
        <MenuItem to="test" disabled>
          Disabled link
        </MenuItem>
        <MenuItem to="test">Online teaching</MenuItem>
        <MenuItem disabled to="test">
          Online teaching
        </MenuItem>
        <MenuItem to="test">Online teaching</MenuItem>
      </>
    ),
    triggerText: 'Menu popover',
    id: 'menu',
  },
};
