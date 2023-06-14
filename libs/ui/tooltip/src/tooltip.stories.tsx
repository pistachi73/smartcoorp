import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Caption } from '@smartcoorp/ui/caption';
import { Headline } from '@smartcoorp/ui/headline';

import { Tooltip } from './tooltip';
import type { TooltipProps } from './tooltip.types';

export default {
  title: 'Component/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          "A Tooltip component presents content within a container on top of the application's main UI.",
      },
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
          <Headline size="small">Tooltip headline</Headline>
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
