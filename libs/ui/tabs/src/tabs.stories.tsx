import { Meta } from '@storybook/react';

import { TemplateProps, iconArgs } from '@smartcoorp/ui/shared';

import { Tabs } from './tabs';
import { TabsProps } from './tabs.types';

export default {
  title: 'Component/Tabs',
  description: 'Tabs component for SC projects',
  component: Tabs,

  parameters: {
    maxWidth: true,
    docs: {
      description: {
        component:
          'The Tabs component is a versatile and interactive user interface element that allows you to organize and present content in a tabbed layout. It is built using React, a popular JavaScript library for building user interfaces. The Tabs component enables users to switch between different sections of content within a single container, enhancing navigation and improving the overall user experience. Each tab typically represents a distinct category or topic, and clicking on a tab displays its associated content while hiding the others. Tabs can be customized with various styling options, such as different colors, icons, or animations, to match the design of your application. The component provides a flexible and reusable solution for creating tabbed interfaces in React applications, making it easier to manage complex content structures and provide intuitive navigation options.',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
    innerRef: { table: { disable: true } },
  },
} as Meta<TabsProps>;

export const Default: TemplateProps<TabsProps> = {
  args: {
    tabs: [
      {
        id: 'tab-1',
        label: 'Tab 1',

        content: 'Tab 1 content',
      },
      {
        id: 'tab-2',
        label: 'Tab 2',
        content: 'Tab 2 content',
      },
      {
        id: 'tab-3',
        label: 'Tab 3',
        content: 'Tab 3 content',
      },
    ],
  },
};
