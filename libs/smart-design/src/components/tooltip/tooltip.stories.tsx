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
import { useState } from 'react';

import { Body } from '../body';
import { Button } from '../button';
import { Caption } from '../caption/caption';
import { Headline } from '../headline';

import { Tooltip } from './tooltip';
import type { TooltipProps } from './tooltip.types';

export default {
  title: 'Component/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Tooltip</Title>
          <Subtitle>Tooltip component</Subtitle>
          <Description>##Overview</Description>
          <Description>
            A Tooltip component presents content within a container on top of
            the application's main UI.
          </Description>
          <Description>##Usage</Description>
          <Source
            language="js"
            code={`import { Tooltip } from @smart-design/components`}
          />
          <Description>###Example</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories title="References" />
        </>
      ),
    },
    controls: { sort: 'requiredFirst' },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as Meta<TooltipProps>;

const Template: StoryFn<TooltipProps> = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip
      {...args}
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant="secondary">Hover me</Button>}
      content={
        <>
          <Headline size="small" noMarign>
            Tooltip headline
          </Headline>
          <Body size="xsmall" noMargin>
            Tooltip paragraph
          </Body>
          <Caption as="span" size="xsmall" noMargin>
            Tooltip span
          </Caption>
        </>
      }
    />
  );
};

export const Default = {
  render: Template,

  args: {
    align: 'center',
    side: 'right',
    defaultOpen: false,
  },
};
