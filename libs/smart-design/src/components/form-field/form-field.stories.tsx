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
import { useForm } from 'react-hook-form';

import { iconArgs } from '../../helpers';
import { Button } from '../button';

import { FormField } from './form-field';
import { FormFieldProps } from './form-field.types';
import { RHFFormField } from './rhf-form-field';

export default {
  title: 'Form/Form Field',
  component: FormField,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>FormField</Title>
          <Subtitle>FormField component for SC projects</Subtitle>
          <Description>##Overview</Description>
          <Description>
            `FormField` component is used as **Input** field for forms
          </Description>

          <Description>##Usage</Description>
          <Source
            language="tsx"
            code={`import { FormField } from @smart-design/components`}
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
    icon: iconArgs,
  },
} as Meta<FormFieldProps>;

const Template: StoryFn<FormFieldProps> = (args) => {
  const { control, handleSubmit } = useForm<{
    input: string | number;
  }>({});

  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFFormField
        control={control}
        name="input"
        rules={{
          required: 'This field is required',
        }}
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
      />

      <Button style={{ marginTop: '20px' }} type="submit">
        Submit
      </Button>
    </form>
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
