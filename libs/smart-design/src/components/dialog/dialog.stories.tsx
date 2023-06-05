import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Body } from '../body';
import { Button } from '../button';
import { Headline } from '../headline/headline';

import { Dialog, DialogContent, DialogTrigger } from './dialog';

export default {
  title: 'Component/Dialog',
  component: Dialog,
  subcomponents: { DialogContent, DialogTrigger },
  parameters: {
    docs: {
      description: {
        component:
          "A Dialog component presents content within a container on top of the application's main UI. Dialogs give two options: reject or confirm for the action required inside. This is useful when something is going to be deleted, when data is going to be lost for some reason etc...",
      },
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
    </div>
  );
};

export const Default = {
  render: Template,
  args: {},
  parameters: {},
};
