import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@smartcoorp/ui/button';
import { TemplateProps, noCanvas } from '@smartcoorp/ui/shared';

import { RadioGroup } from './radio-group';
import type { RadioGroupProps } from './radio-group.types';
import { RHFRadioGroup, RHFRadioGroupProps } from './rhf-radio-group';

export default {
  title: 'Form/Radio Group',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          'The RadioGroup component is a reusable React component that provides a simple and intuitive way to include RadioGroupes in your user interface. It allows users to select one or multiple options from a predefined list by toggling the RadioGroupes on or off.',
      },
    },
    controls: { sort: 'requiredFirst' },
  },
} as Meta<RadioGroupProps>;

const options = [
  {
    label: 'Default',
    value: 'default',
  },
  {
    label: 'Comfortable',
    value: 'comfortable',
  },
  {
    label: 'Compact',
    value: 'compact',
  },
];

const Template: StoryFn<RadioGroupProps> = (args) => {
  const { options: argsOptions, value, onChange, ...restArgs } = args;
  const [radioValue, setValue] = useState(args?.defaultValue ?? undefined);
  return (
    <RadioGroup
      {...restArgs}
      options={options}
      value={radioValue}
      onChange={setValue}
    />
  );
};

export const Default: TemplateProps<RadioGroupProps> = {
  render: Template,
  args: {},
};

export const Disabled: TemplateProps<RadioGroupProps> = {
  render: Template,
  args: {
    isDisabled: true,
  },
};

export const Error: TemplateProps<RadioGroupProps> = {
  render: Template,
  args: {
    isError: true,
  },
};

type FormFields = {
  radio: string;
};
const WithReactHookFormTemplate: StoryFn<RHFRadioGroupProps<FormFields>> = (
  args
) => {
  const { control, handleSubmit } = useForm<FormFields>({
    defaultValues: {},
  });
  const onSubmit = (data: FormFields) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFRadioGroup
        control={control}
        name="radio"
        rules={{ required: 'This field is required' }}
        defaultValue={args?.defaultValue}
        isDisabled={args?.isDisabled}
        options={options}
        size={args?.size}
        sizeConfined={args?.sizeConfined}
        sizeWide={args?.sizeWide}
      />
      <Button style={{ marginTop: '20px' }} type="submit">
        Submit
      </Button>
    </form>
  );
};

export const WithReactHookForm: TemplateProps<RHFRadioGroupProps<FormFields>> =
  {
    render: WithReactHookFormTemplate,
    args: {},
    parameters: {
      ...noCanvas,
      docs: {
        description: {
          story: 'This is an example of how to use the component with **RHF**',
        },
        source: {
          code: `
<form onSubmit={handleSubmit(onSubmit)}>
  <RHFRadioGroup
    control={control}
    name="radio"
    defaultValue={defaultValue}
    isDisabled={isDisabled}
    options={options}
  />
</form>`,
          language: 'tsx',
        },
      },
    },
  };
