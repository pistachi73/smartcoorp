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
import styled from 'styled-components';

import { gray100, gray200 } from '../../tokens/color';
import { Body } from '../body';
import { Button } from '../button';
import { Calendar } from '../calendar/calendar';
import { FormField } from '../form-field';
import { Headline } from '../headline/headline';

import { Popover, PopoverContent, PopoverTrigger } from './popover';
import type { PopoverProps } from './popover.types';

export default {
  title: 'Component/Popover',
  component: Popover,
  subcomponents: { PopoverContent, PopoverTrigger },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Popover</Title>
          <Subtitle>Popover layout component</Subtitle>
          <Description>##Overview</Description>
          <Description>
            A Popover component presents content within a container on top of
            the application's main UI. Popovers give two options: reject or
            confirm for the action required inside. This is useful when
            something is going to be deleted, when data is going to be lost for
            some reason etc...
          </Description>
          <Description>##Usage</Description>
          <Source
            language="jsx"
            code={`import { Popover, PopoverContent, PopoverTrigger } from @smart-design/components`}
            format={true}
          />
          <Description>###Example</Description>
          <Primary />
          <ArgsTable
            story={PRIMARY_STORY}
            components={{
              Popover,
              PopoverContent,
              PopoverTrigger,
            }}
          />
          <Stories title="References" />
        </>
      ),
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
