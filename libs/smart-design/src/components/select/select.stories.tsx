import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { TemplateProps, noCanvas } from '../../helpers';
import { Button } from '../button';

import { RHFSelect, RHFSelectProps } from './rhf-select';
import { Select } from './select';
import type { SelectOptions, SelectProps } from './select.types';

export default {
  title: 'Form/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'Select component is a wrapper around react-select component. It provides a styled select component with a label and helper text.',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as Meta<typeof Select>;

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

const SingleSelectTemplate: StoryFn<SelectProps> = (args) => {
  const [selectedOption, setSelectedOption] = useState<string>();

  return (
    <Select
      defaultValue={args.isMulti ? ['mentor'] : 'mentor'}
      isDisabled={args?.isDisabled}
      isError={args?.isError}
      helperText={args?.helperText}
      label={args.label}
      options={options}
      size={args.size}
      placeholder={args.placeholder}
      sizeConfined={args.sizeConfined}
      sizeWide={args.sizeWide}
      onChange={setSelectedOption}
      value={selectedOption}
    />
  );
};

const MultipleSelectTemplate: StoryFn<SelectProps> = (args) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>();

  return (
    <Select
      defaultValue={args.defaultValue}
      isDisabled={args?.isDisabled}
      helperText={args?.helperText}
      label={args.label}
      options={options}
      isMulti={true}
      size={args.size}
      placeholder={args.placeholder}
      sizeConfined={args.sizeConfined}
      sizeWide={args.sizeWide}
      onChange={setSelectedOptions}
      value={selectedOptions}
    />
  );
};

export const Default = {
  render: SingleSelectTemplate,
  args: {
    placeholder: 'Select something...',
    label: 'Single select',
    helperText: 'This is a helper text',
  },
};
export const Single = {
  render: SingleSelectTemplate,
  args: {
    placeholder: 'Select something...',
    label: 'Single select',
  },
  parameters: {
    docs: {
      description: {
        story: 'This is a **single** select component.',
      },
    },
  },
};

export const Multiple = {
  render: MultipleSelectTemplate,
  args: {
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
  render: SingleSelectTemplate,
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
  render: SingleSelectTemplate,
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

type FormValues = {
  select: string;
};
const WithReactHookFormTemplate: StoryFn<RHFSelectProps<FormValues>> = (
  args
) => {
  const { control, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFSelect
        control={control}
        name="select"
        rules={{ required: 'This field is required' }}
        defaultValue={args?.isMulti ? ['mentor'] : 'mentor'}
        isDisabled={args?.isDisabled}
        helperText={args?.helperText}
        label={args.label}
        options={options}
        isMulti={args.isMulti}
        size={args.size}
        placeholder={args.placeholder}
        sizeConfined={args.sizeConfined}
        sizeWide={args.sizeWide}
      />

      <Button style={{ marginTop: '20px' }} type="submit">
        Submit
      </Button>
    </form>
  );
};

export const WithReactHookForm: TemplateProps<RHFSelectProps<FormValues>> = {
  render: WithReactHookFormTemplate,
  args: {
    label: 'Select Label',
    helperText: 'Helper text',
    isMulti: false,
  },
  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: 'This is an example of how to use the component with **RHF**',
      },
      source: {
        code: `
<form onSubmit={handleSubmit(onSubmit)}>
  <RHFSelect
    control={control}
    name="select"
    rules={{ required: 'This field is required' }}
    defaultValue={"mentor"}
    helperText={"Helper text"}
    label={"Select Label"}
    options={options}
  />
</form>`,
        language: 'tsx',
      },
    },
  },
};
