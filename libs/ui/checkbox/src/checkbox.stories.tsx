import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@smartcoorp/ui/button';
import { TemplateProps, noCanvas } from '@smartcoorp/ui/shared';

import { Checkbox } from './checkbox';
import type { CheckboxProps } from './checkbox.types';
import { RHFCheckbox, RHFCheckboxProps } from './rhf-checkbox';

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'The Checkbox component is a reusable React component that provides a simple and intuitive way to include checkboxes in your user interface. It allows users to select one or multiple options from a predefined list by toggling the checkboxes on or off.',
      },
    },
    controls: { sort: 'requiredFirst' },
  },
} as Meta<CheckboxProps>;

const Template: StoryFn<CheckboxProps> = (args) => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      onChange={setChecked}
      checked={checked}
      label={args?.label}
      defaultValue={args?.defaultValue}
      isDisabled={args?.isDisabled}
      size={args?.size}
      sizeConfined={args?.sizeConfined}
      sizeWide={args?.sizeWide}
    />
  );
};

export const Default: TemplateProps<CheckboxProps> = {
  render: Template,
  args: {
    label: 'Accept terms and conditions.',
  },
  parameters: {},
};

export const Disabled: TemplateProps<CheckboxProps> = {
  render: Template,
  args: {
    label: 'Accept terms and conditions.',
    isDisabled: true,
  },
};

type FormFields = {
  checkbox: boolean;
};
const WithReactHookFormTemplate: StoryFn<RHFCheckboxProps<FormFields>> = (
  args
) => {
  const { control, handleSubmit } = useForm<FormFields>();
  const onSubmit = (data: FormFields) => console.log(data);

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
      <Button style={{ marginTop: '20px' }} type="submit">
        Submit
      </Button>
    </form>
  );
};

export const WithReactHookForm: TemplateProps<RHFCheckboxProps<FormFields>> = {
  render: WithReactHookFormTemplate,
  args: {
    label: 'Accept terms and conditions.',
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
  <RHFCheckbox
    control={control}
    name="checkbox"
    label={"Accept terms and conditions."}
  />
</form>`,
        language: 'tsx',
      },
    },
  },
};
