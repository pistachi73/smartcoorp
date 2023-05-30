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

import { Select } from './select';
import type { SelectOptions, SelectProps } from './select.types';

export default {
  title: 'Component/Select',
  component: Select,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Select</Title>
          <Subtitle>Select component</Subtitle>
          <Description>##Overview</Description>
          <Description>
            Select component is a wrapper around react-select component. It
            provides a styled select component with a label and helper text.
          </Description>
          <Description>##Usage</Description>
          <Source
            language="jsx"
            code={`import { Select } from @smart-design/components`}
            format={true}
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
} as Meta<typeof Select>;

const Template: StoryFn<SelectProps> = (args) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const options: SelectOptions = [
    { value: 'mentor', label: 'Mentoring' },
    { value: 'teaching', label: 'Teaching' },
    { value: 'multiple', label: 'Multiple' },
    { value: 'tutor', label: 'Tutoring' },

    { value: 'mixed', label: 'Mixed' },
    {
      label: 'Structure',
      options: [
        { value: '1to1', label: '1 to 1' },
        { value: '1to3', label: '1 to 3' },
      ],
    },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="single-select"
        rules={{ required: 'This field is required' }}
        render={({ field, fieldState: { error } }) => (
          <Select
            isDisabled={args?.isDisabled}
            isError={args?.isError ? args?.isError : Boolean(error)}
            helperText={error ? error?.message : args.helperText}
            label={args.label}
            options={options}
            isMulti={args.isMulti}
            size={args.size}
            placeholder={args.placeholder}
            sizeConfined={args.sizeConfined}
            sizeWide={args.sizeWide}
            {...field}
          />
        )}
      ></Controller>
    </form>
  );
};

export const Default = {
  render: Template,
  args: {
    placeholder: 'Select something...',
    label: 'Single select',
    helperText: 'This is a helper text',
  },
};
export const Single = {
  render: Template,
  args: {
    placeholder: 'Select something...',
    label: 'Single select',
  },
  parameters: {
    docs: {
      description: {
        story:
          //Write a description for this story
          'This is a **single** select component.',
      },
    },
  },
};

export const Multiple = {
  render: Template,
  args: {
    isMulti: true,
    placeholder: 'Select something...',
    label: 'Multiple select',
  },
  parameters: {
    docs: {
      description: {
        story:
          //Write a description for this story
          'This is a **multiple** select component.',
      },
    },
  },
};
export const Disabled = {
  render: Template,
  args: {
    isDisabled: true,
    placeholder: 'Select something...',
    label: 'Disabled select',
  },

  parameters: {
    docs: {
      description: {
        story:
          //Write a description for this story
          'This is a **disabled** select component.',
      },
    },
  },
};

export const Error = {
  render: Template,
  args: {
    isError: true,
    placeholder: 'Select something...',
    label: 'Error select',
  },
  parameters: {
    docs: {
      description: {
        story:
          //Write a description for this story
          'This is a **error** select component.',
      },
    },
  },
};
