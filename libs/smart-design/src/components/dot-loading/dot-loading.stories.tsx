import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Primary,
  Source,
  Subtitle,
  Title,
} from '@storybook/addon-docs';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { noCanvas } from '../../helpers';

import { DotLoading as DotLoadingComponent } from './dot-loading';

export default {
  title: 'Component/Dot Loading',
  component: DotLoadingComponent,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Loader</Title>
          <Subtitle>Loading animation</Subtitle>

          <Description>##Overview</Description>
          <Description>
            `DotLoading` component is the loading animation for SC projects. It
            can be used in different situations
          </Description>
          <Description>- loading state for `Button` component</Description>
          <Description>- loading page</Description>

          <Description>##Usage</Description>
          <Source
            language="tsx"
            code={`import { DotLoading } from @smart-design/components`}
          />
          <Description>###Example</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
        </>
      ),
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as Meta<typeof DotLoadingComponent>;

export const DotLoading = {
  args: {
    size: 'medium',
  },

  parameters: {
    ...noCanvas,
  },
};
