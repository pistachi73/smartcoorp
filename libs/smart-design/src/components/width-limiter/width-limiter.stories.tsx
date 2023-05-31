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

import { Hero } from '../hero';

import { WidthLimiter } from './width-limiter';
import type { WidthLimiterProps } from './width-limiter.types';

export default {
  title: 'Component/Width Limiter',
  component: WidthLimiter,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Width Limiter</Title>
          <Subtitle>Width Limiter Component</Subtitle>
          <Description>##Overview</Description>
          <Description>
            `WidthLimiter` component is used to set `max-width` and left/right
            paddings for content
          </Description>
          <Description>##Usage</Description>
          <Source
            language="js"
            code={`import { WidthLimiter } from @smart-design/components`}
          />
          <Description>###Example</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories title="References" />
        </>
      ),
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
