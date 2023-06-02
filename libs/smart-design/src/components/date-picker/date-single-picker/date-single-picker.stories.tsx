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
import { TemplateProps, noCanvas } from 'libs/smart-design/src/helpers';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';

import { Button } from '../../button';
import { DateSinglePickerProps } from '../date-picker.types';

import { DateSinglePicker } from './date-single-picker';
import {
  RHFDateSinglePicker,
  RHFDateSinglePickerProps,
} from './rhf-date-single-picker';

export default {
  title: 'Form/Date Picker/Date Single Picker',
  component: DateSinglePicker,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Date Single Picker</Title>
          <Subtitle>Date Single Picker component for SC projects</Subtitle>
          <Description>##Overview</Description>
          <Description>
            A single date picker is a versatile component designed for React
            projects, allowing users to select a specific date from a calendar
            interface. With its intuitive design and seamless integration, it
            provides a seamless and efficient way for users to input dates.
            Whether it's for scheduling appointments, setting deadlines, or
            managing events, the single date picker is an essential tool for
            enhancing user experiences in your React applications.
          </Description>
          <Description>##Usage</Description>
          <Source
            language="tsx"
            code={`import { DateSinglePicker } from @smart-design/components`}
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
} as Meta<DateSinglePickerProps>;

const Template: StoryFn<DateSinglePickerProps> = (args) => {
  const [singleSelect, setSingleSelect] = useState<Date | undefined>();

  return (
    <DateSinglePicker
      selected={singleSelect}
      onSelect={setSingleSelect}
      withCustomValues={args.withCustomValues}
      isDisabled={args.isDisabled}
      isError={args.isError}
    />
  );
};

export const Default = {
  render: Template,
  args: {},
};

export const WithCustomValues: TemplateProps<DateSinglePickerProps> = {
  render: Template,
  args: {
    withCustomValues: [
      {
        label: 'Today',
        value: '0',
      },
      {
        label: 'Tomorrow',
        value: '1',
      },
      {
        label: 'Yesterday',
        value: '-1',
      },
    ],
  },
  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story:
          'The `withCustomValues` prop allows for custom predefined date values.',
      },
    },
  },
};

type FormFields = { date: Date };

const WithReactHookFormTemplate: StoryFn<
  RHFDateSinglePickerProps<FormFields>
> = (args) => {
  const { control, handleSubmit } = useForm<FormFields>();

  const onSubmit = (data: FormFields) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFDateSinglePicker
        control={control}
        name="date"
        defaultValue={args?.defaultValue}
        withCustomValues={args.withCustomValues}
        isDisabled={args.isDisabled}
      />
      <Button style={{ marginTop: '10px' }} type="submit">
        Submit
      </Button>
    </form>
  );
};

export const WithReactHookForm: TemplateProps<
  RHFDateSinglePickerProps<FormFields>
> = {
  render: WithReactHookFormTemplate,
  args: {
    defaultValue: new Date(),
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
   <RHFDateSinglePicker
     control={control}
     name="date"
     withCustomValues={args.withCustomValues}
     isDisabled={args.isDisabled}
   />
 </form>`,

        language: 'tsx',
      },
    },
  },
};