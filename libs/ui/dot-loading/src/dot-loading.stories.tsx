import { Meta } from '@storybook/react';

import { noCanvas } from '@smartcoorp/ui/shared';

import { DotLoading } from './dot-loading';

export default {
  title: 'Component/Dot Loading',
  component: DotLoading,
  parameters: {
    docs: {
      description: {
        component:
          'DotLoading component is the loading animation for SC projects. It can be used in different situations',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as Meta<typeof DotLoading>;

export const Default = {
  args: {
    size: 'medium',
  },

  parameters: {
    ...noCanvas,
  },
};

export const Disabled = {
  args: {
    size: 'medium',
    disabled: true,
  },

  parameters: {
    docs: {
      description: {
        story: '**Disabled** state of the component',
      },
    },
  },
};
