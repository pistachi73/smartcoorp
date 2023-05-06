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

import { noCanvas } from '../../helpers';
import { Button } from '../button';

import {
  SingleSelect as SingleSelectComponent,
  SingleSelectItem,
  SingleSlectItemGroup,
} from './single-select';

export default {
  title: 'Component/Single Select 2',
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
        render={({
          field: { ref, onChange, value, ...field },
          fieldState: { error },
        }) => (
          <SingleSelectComponent
            disabled={false}
            error={Boolean(error)}
            helperText={error ? error?.message : 'This is a helper text'}
            placeholder="Select something..."
            ariaLabel="test"
            label="Select label"
            onValueChange={onChange}
            value={value}
          >
            <SingleSlectItemGroup label="group">
              <SingleSelectItem value="value1">Select value 1</SingleSelectItem>
            </SingleSlectItemGroup>
            <SingleSelectItem value="value2">Select value 2</SingleSelectItem>
            <SingleSelectItem value="value3">Select value 3</SingleSelectItem>
            <SingleSlectItemGroup label="group">
              <SingleSelectItem value="value4">Select value 4</SingleSelectItem>
            </SingleSlectItemGroup>
            <SingleSelectItem value="value4">Select value 4</SingleSelectItem>

            <SingleSelectItem value="value4">Select value 4</SingleSelectItem>

            <SingleSelectItem value="value4">Select value 4</SingleSelectItem>
            <SingleSelectItem value="value4">Select value 4</SingleSelectItem>
            <SingleSelectItem value="value4">Select value 4</SingleSelectItem>
            <SingleSelectItem value="value4">Select value 4</SingleSelectItem>
            <SingleSelectItem value="value4">Select value 4</SingleSelectItem>
            <SingleSelectItem value="value4">Select value 4</SingleSelectItem>
          </SingleSelectComponent>
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
};
