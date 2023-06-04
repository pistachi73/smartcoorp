import { Meta, StoryFn } from '@storybook/react';
import styled from 'styled-components';

import { Button } from '../button';
import { FormField } from '../form-field';

import { Popover, PopoverContent, PopoverTrigger } from './popover';

export default {
  title: 'Component/Popover',
  component: Popover,
  subcomponents: { PopoverContent, PopoverTrigger },
  parameters: {
    docs: {
      description: {
        component:
          "A Popover component presents content within a container on top of the application's main UI. Popovers give two options: reject or confirm for the action required inside. This is useful when something is going to be deleted, when data is going to be lost for some reason etc...",
      },
    },
    controls: { sort: 'requiredFirst' },
  },
} as Meta<typeof Popover>;

const Content = styled.div`
  padding: 16px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  width: 180px;

  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: white;
`;
const Template: StoryFn<typeof Popover> = (args) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Content>
          <FormField size="small" label="Email" onChange={() => {}} />
          <FormField size="small" label="Password" onChange={() => {}} />
        </Content>
      </PopoverContent>
    </Popover>
  );
};

export const Default = {
  render: Template,
  args: {},
  parameters: {},
};
