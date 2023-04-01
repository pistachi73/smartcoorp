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
import React, { useState } from 'react';

import { noCanvas } from '../../helpers';
import { Body } from '../body';
import { Button } from '../button';
import { Headline } from '../headline/headline';

import { Dialog as DialogComponent } from './dialog';

export default {
  title: 'Layout/Dialog',
  component: DialogComponent,
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
            going to be deleted, when data is going to be losed for some reason
            etc...
          </Description>
          <Description>##Usage</Description>
          <Source
            language="js"
            code={`import { Dialog } from @smart-design/components`}
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
    onClose: { type: 'function' },
    onBackgroundClick: { type: 'function' },
    onConfirm: { type: 'function' },
    onReject: { type: 'function' },
  },
} as Meta<typeof DialogComponent>;

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}
const Template: StoryFn<typeof DialogComponent> = (args) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => setShow(false);

  const onConfirm = async () => {
    setIsLoading(true);
    await timeout(3000);
    setShow(false);
    setIsLoading(false);
  };

  const onReject = () => {
    setShow(false);
  };

  return (
    <>
      <Button onClick={() => setShow(true)}>Open Dialog</Button>
      <DialogComponent
        {...args}
        show={show}
        onClose={closeModal}
        onBackgroundClick={closeModal}
        onConfirm={onConfirm}
        onReject={onReject}
        rejectLabel={args.rejectLabel!}
        loading={isLoading}
      >
        <Headline size="xlarge">Delete content</Headline>
        <Body size="small">
          Are you sure to remove this content? You can access this file for 7
          days in your trash.
        </Body>
      </DialogComponent>
    </>
  );
};

export const Dialog = {
  render: Template,

  args: {
    rootId: 'docs-root',
    confirmLabel: 'Confirm',
    rejectLabel: 'Cancel',
    size: 'small',
    closeIcon: true,
  },

  parameters: {
    ...noCanvas,
  },
};
