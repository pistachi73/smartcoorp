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

import { Container as ContainerComponent } from './container';

export default {
  title: 'Layout/Container',
  component: ContainerComponent,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Container</Title>
          <Subtitle>Container Component</Subtitle>
          <Description>##Overview</Description>
          <Description>
            `Container` component is used to set `max-width` and left/right
            paddings for content
          </Description>
          <Description>##Usage</Description>
          <Source
            language="js"
            code={`import { Container } from @smart-design/components`}
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
} as Meta<typeof ContainerComponent>;

const Template: StoryFn<typeof ContainerComponent> = (args) => (
  <ContainerComponent {...args}>
    <div style={{ backgroundColor: 'lightblue' }}>{args.children}</div>
  </ContainerComponent>
);

export const Container = {
  render: Template,

  args: {
    children: <Hero size="xlarge">Container for content</Hero>,
  },
};
