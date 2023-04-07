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
import { useEffect, useState } from 'react';

import { Body } from '../body';
import { Button } from '../button';
import { Headline } from '../headline/headline';

import { Dialog, DialogContent, DialogTrigger } from './dialog';

export default {
  title: 'Layout/Dialog',
  component: Dialog,
  subcomponents: { DialogContent, DialogTrigger },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Dialog</Title>
          <Subtitle>Dialog layout component</Subtitle>
          <Description>##Overview</Description>
          <Description>
            A Dialog component presents content within a container on top of the
            application's main UI. Dialogs give two options: reject or confirm
            for the action required inside. This is useful when something is
            going to be deleted, when data is going to be lost for some reason
            etc...
          </Description>
          <Description>##Usage</Description>
          <Source
            language="jsx"
            code={`import { Dialog, DialogContent, DialogTrigger } from @smart-design/components`}
            format={true}
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
} as Meta<typeof Dialog>;

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}
const Template: StoryFn<typeof Dialog> = (args) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onAction = async () => {
    setIsLoading(true);
    await timeout(3000);
    setIsLoading(false);
    setOpen(false);
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent
        title="Delete content"
        description="Delete blog content"
        actionLabel="Yes, delete content"
        onAction={onAction}
        cancelLabel="Cancel"
        onCancel={onCancel}
        loading={isLoading}
      >
        <Headline size="xlarge">Delete content</Headline>
        <Body size="small">
          Are you sure to remove this content? You can access this file for 7
          days in your trash.
        </Body>
      </DialogContent>
    </Dialog>
  );
};

export const Default = {
  render: Template,
  args: {},
  parameters: {},
};
