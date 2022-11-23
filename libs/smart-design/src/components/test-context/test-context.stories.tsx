import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { TestContext } from './test-context';

export default {
  title: 'Typography/TestContext',
  component: TestContext,
  parameters: {},
  argTypes: {},
} as ComponentMeta<typeof TestContext>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TestContext> = (args) => <TestContext />;

export const Default = Template.bind({});
