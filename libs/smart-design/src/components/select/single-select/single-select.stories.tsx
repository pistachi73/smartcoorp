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
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { noCanvas } from '../../../helpers';
import { Button } from '../../button';

import { SingleSelect as SingleSelectComponent } from './single-select';

export default {
  title: 'Component/Single Select',
  component: SingleSelectComponent,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>Single Select</Title>
          <Subtitle>Single Select dropdown component</Subtitle>
          <Description>##Overview</Description>
          <Description>
            This component is used to select **one single** option in forms or
            quizes
          </Description>
          <Description>##Usage</Description>
          <Source
            language="tsx"
            code={`import { SingleSelect } from @smart-design/components`}
          />
          <Description>###Example</Description>
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories title="References" />
        </>
      ),
    },
  },
  argTypes: {},
} as Meta<typeof SingleSelectComponent>;

const Template: StoryFn<typeof SingleSelectComponent> = (args, context) => {
  const { control, handleSubmit } = useForm();
  const { storyId } = context;

  const options = [
    { value: 'mentor', label: 'Mentoring' },
    { value: 'teaching', label: 'Teaching' },
    { value: 'multiple', label: 'Multiple' },
    { value: 'tutor', label: 'Tutoring' },
    { value: '1to1', label: '1 to 1' },
    { value: 'mixed', label: 'Mixed' },
    { value: '1to3', label: '1 to 3' },
  ];

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="single-select"
        defaultValue={'value1'}
        render={({
          field: { ref, onChange, ...field },
          fieldState: { error },
        }) => (
          <SingleSelectComponent
            innerRef={ref}
            {...field}
            {...args}
            id={`story${storyId}_${args.id}`}
            options={options}
            onChange={onChange}
            error={Boolean(error)}
            errorMessage={error?.message}
          />
        )}
        rules={{ required: 'This field is required' }}
      ></Controller>
      <Button type="submit" style={{ marginTop: '30px' }}>
        Submit and check console
      </Button>
    </form>
  );
};

export const SingleSelect = {
  render: Template,

  args: {
    label: 'Single Select',
    defaultValue: 'mentor',
    id: 'single-slect',
  },

  parameters: {
    docs: {
      source: {
        code: `const { control } = useForm();

  const options = [
      { value: "mentor", label: "Mentoring" },
      { value: "teaching", label: "Teaching" },
      { value: "multiple", label: "Multiple" },
      { value: "tutor", label: "Tutoring" },
      { value: "1to1", label: "1 to 1" },
      { value: "mixed", label: "Mixed" },
      { value: "1to3", label: "1 to 3" },
  ];

  return (
      <Controller
        control={control}
        name='single-select'
        render={({ field: { onChange, ref, ...field }, fieldState: { error } }) => (
          <SingleSelect
            innerRef={ref}
            options={options}
            onChange={onChange}
            error={Boolean(error)}
            errorMessage={error?.message}
            {...field}
            {...args} /** Args of the Single Select */
          />
        )}
        rules={{ required: "This field is required" }}
      ></Controller>
  );`,
      },
    },
  },
};

const TemplateTwo: StoryFn<typeof SingleSelectComponent> = (args, context) => {
  const { storyId } = context;

  const options = [
    { value: 'mentor', label: 'Mentoring' },
    { value: 'teaching', label: 'Teaching' },
    { value: 'multiple', label: 'Multiple' },
    { value: 'tutor', label: 'Tutoring' },
    { value: '1to1', label: '1 to 1' },
    { value: 'mixed', label: 'Mixed' },
    { value: '1to3', label: '1 to 3' },
  ];

  return (
    <SingleSelectComponent
      {...args}
      options={options}
      id={`story${storyId}_${args.id}`}
      onChange={() => true}
    />
  );
};

export const SingleSelectWithoutLabel = {
  render: TemplateTwo,

  args: {
    labelDescription: 'Username',
    id: 'single-select-without-label',
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: '`SingleSelect` without label',
      },
    },
  },
};

export const DisabledSingleSelect = {
  render: TemplateTwo,

  args: {
    label: 'Disabled single slect',
    disabled: true,
    id: 'disabled-single-select-without-values',
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: 'Disabled `SingleSelect` component with no values',
      },
    },
  },
};

export const DisabledSingleSelectWithValues = {
  render: TemplateTwo,

  args: {
    label: 'Disabled single slect',
    disabled: true,
    id: 'disabled-single-select-with-values',
    defaultValue: 'mentor',
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: 'Disabled `SingleSelect` component with values',
      },
    },
  },
};

export const ErrorSingleSelect = {
  render: TemplateTwo,

  args: {
    label: 'Error single select',
    error: true,
    errorMessage: 'This field is required',
    id: 'error-single-select',
  },

  parameters: {
    ...noCanvas,
    docs: {
      description: {
        story: '`SingleSelect` component with `error` and `errorMessage`',
      },
    },
  },
};
