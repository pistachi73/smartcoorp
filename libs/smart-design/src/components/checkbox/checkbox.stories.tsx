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
import { Controller, useForm } from 'react-hook-form';

import { Button } from '../button';

import { Checkbox } from './checkbox';
import type { CheckboxProps } from './checkbox.types';
import { RHFCheckbox } from './rhf-checkbox';
export default {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Checkbox</Title>
          <Subtitle>Checkbox component</Subtitle>
          <Description>##Overview</Description>
          <Description>
            The checkbox component is used to select multiple options from a set
            of options.
          </Description>
          <Description>##Usage</Description>
          <Source
            language="jsx"
            code={`import { Checkbox } from @smart-design/components`}
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
} as Meta<CheckboxProps>;

const Template: StoryFn<CheckboxProps> = (args) => {
  const { control, handleSubmit } = useForm<{ checkbox: boolean }>();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFCheckbox
        control={control}
        name="checkbox"
        label={args?.label}
        defaultValue={args?.defaultValue}
        isDisabled={args?.isDisabled}
        size={args?.size}
        sizeConfined={args?.sizeConfined}
        sizeWide={args?.sizeWide}
      />
    </form>
  );
};

export const Default = {
  render: Template,
  args: {
    label: 'Accept terms and conditions.',
  },
  parameters: {},
};

export const Disabled = {
  render: Template,
  args: {
    label: 'Accept terms and conditions.',

    isDisabled: true,
  },
};
