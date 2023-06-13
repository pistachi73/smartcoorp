import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { TemplateProps, iconArgs, noCanvas } from '../../helpers';
import { Button } from '../button';

import {
  DebounceFormField,
  DebounceFormFieldProps,
} from './debounce-form-field';
import { FormField } from './form-field';
import { FormFieldProps } from './form-field.types';
import { RHFFormField, RHFFormFieldProps } from './rhf-form-field';

export default {
  title: 'Form/Form Field',
  component: FormField,
  parameters: {
    docs: {
      description: {
        component: 'Form Field component is used as **Input** field for forms',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
    icon: iconArgs,
  },
} as Meta<FormFieldProps>;

const Template: StoryFn<FormFieldProps> = (args: any) => {
  const [value, setValue] = useState<string | number>();
  return (
    <FormField
      label={args?.label}
      icon={args?.icon}
      placeholder="Type something..."
      defaultValue={args?.defaultValue}
      isMultiline={args?.isMultiline}
      isDisabled={args?.isDisabled}
      isError={args?.isError}
      helperText={args.helperText}
      type={args?.type}
      size={args?.size}
      sizeConfined={args?.sizeConfined}
      sizeWide={args?.sizeWide}
      onChange={setValue}
      value={value}
    />
  );
};

export const Default = {
  render: Template,
  args: {
    label: 'Form field Label',
    helperText: 'Helper text',
  },
};

export const Multiline = {
  render: Template,
  args: {
    label: 'Form field Label',
    isMultiline: true,
  },
};

export const Disabled = {
  render: Template,
  args: {
    label: 'Form field Label',
    isDisabled: true,
  },
};

export const Error = {
  render: Template,
  args: {
    label: 'Form field Label',
    isError: true,
  },
};

export const Number = {
  render: Template,
  args: {
    label: 'Form field Label',
    type: 'number',
  },
};
export const WithTextDefaultValue = {
  render: Template,
  args: {
    label: 'Form field Label',
    defaultValue: 'Default value',
  },
};

export const WithNumberDefaultValue = {
  render: Template,
  args: {
    label: 'Form field Label',
    defaultValue: 2,
    type: 'number',
  },
};

type FormValues = {
  input: string | number;
};
const WithReactHookFormTemplate: StoryFn<RHFFormFieldProps<FormValues>> = (
  args
) => {
  const { control, handleSubmit } = useForm<FormValues>({});
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <RHFFormField
        control={control}
        name="input"
        rules={{
          required: 'This field is required',
        }}
        label={args?.label}
        placeholder="Type something..."
        defaultValue={args?.defaultValue}
        helperText={args.helperText}
        type={args?.type}
      />

      <Button style={{ marginTop: '20px' }} type="submit">
        Submit
      </Button>
    </form>
  );
};

export const WithReactHookForm: TemplateProps<RHFFormFieldProps<FormValues>> = {
  render: WithReactHookFormTemplate,
  args: {
    label: 'Form field Label',
    helperText: 'Helper text',
    type: 'text',
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
  <RHFFormField
    control={control}
    name="input"
    rules={{
      required: 'This field is required',
    }}
    label="Form field Label"
    placeholder="Type something..."
    helperText="Helper text"
    type="text"
  />
</form>`,
        language: 'tsx',
      },
    },
  },
};

const DebouncedFormFieldTemplate: StoryFn<DebounceFormFieldProps> = (
  args: DebounceFormFieldProps
) => {
  const [value, setValue] = useState<string>();
  return (
    <>
      <DebounceFormField
        label={args?.label}
        icon={args?.icon}
        placeholder="Type something..."
        defaultValue={args?.defaultValue}
        isMultiline={args?.isMultiline}
        isDisabled={args?.isDisabled}
        isError={args?.isError}
        helperText={args.helperText}
        type={args?.type}
        size={args?.size}
        sizeConfined={args?.sizeConfined}
        sizeWide={args?.sizeWide}
        onChange={setValue}
        value={value}
      />
      <span>
        <b>Debounced value:</b> {value ? value : 'No value yet'}
      </span>
    </>
  );
};

export const WithDebounceText = {
  render: DebouncedFormFieldTemplate,
  args: {
    label: 'Form field Label',
    helperText: 'Helper text',
  },
};

export const WithDebounceNumber = {
  render: DebouncedFormFieldTemplate,
  args: {
    type: 'number',
    label: 'Form field Label',
    helperText: 'Helper text',
  },
};
