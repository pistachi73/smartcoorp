import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Hero } from '@smartcoorp/ui/hero';

import { WidthLimiter } from './width-limiter';
import type { WidthLimiterProps } from './width-limiter.types';

export default {
  title: 'Component/Width Limiter',
  component: WidthLimiter,
  parameters: {
    docs: {
      description: {
        component:
          'WidthLimiter component is used to set `max-width` and left/right paddings for content',
      },
    },
  },
  argTypes: {},
} as Meta<WidthLimiterProps>;

const Template: StoryFn<WidthLimiterProps> = (args) => (
  <WidthLimiter {...args}>
    <div style={{ backgroundColor: 'lightblue' }}>{args.children}</div>
  </WidthLimiter>
);

export const Default = {
  render: Template,

  args: {
    children: <Hero size="xlarge">Container for content</Hero>,
  },
};
