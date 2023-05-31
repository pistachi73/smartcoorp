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
import { Meta } from '@storybook/react';

import { noCanvas } from '../../helpers';

import { DotLoading } from './dot-loading';

export default {
  title: 'Component/Dot Loading',
  component: DotLoading,
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
          <Stories title="References" />
        </>
      ),
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
        // Write a description for the story here.
        story: '**Disabled** state of the component',
      },
    },
  },
};
