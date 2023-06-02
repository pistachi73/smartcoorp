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
import { TemplateProps } from 'libs/smart-design/src/helpers';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { DateRangePickerProps } from '../date-picker.types';

import { DateRangePicker } from './date-range-picker';

export default {
  title: 'Form/Date Picker/Date Range Picker',
  component: DateRangePicker,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>DateRangePicker</Title>
          <Subtitle>DateRangePicker component for SC projects</Subtitle>
          <Description>##Overview</Description>
          <Description>
            The `DateRangePicker` component in our React component library
            simplifies date selection for users. It provides an interactive
            calendar interface, allowing users to choose dates with ease. The
            selected date is automatically displayed in an input field. The
            component offers customization options, localization support, and
            adheres to accessibility guidelines. It also allows for date
            restrictions. Enhance user experience and streamline date selection
            in your React application with our `DateRangePicker` component.
          </Description>
          <Description>##Usage</Description>
          <Source
            language="tsx"
            code={`import { DateRangePicker } from @smart-design/components`}
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
} as Meta<DateRangePickerProps>;

const Template: StoryFn<DateRangePickerProps> = (args) => {
  const [singleSelect, setSingleSelect] = useState<DateRange | undefined>();

  return (
    <DateRangePicker
      selected={singleSelect}
      onSelect={setSingleSelect}
      max={args?.max}
      min={args?.min}
      withCustomValues={args.withCustomValues}
    />
  );
};

export const Default = {
  render: Template,
  args: {},
};

export const WithCustomValues: TemplateProps<DateRangePickerProps> = {
  render: Template,
  args: {
    withCustomValues: [
      {
        label: 'Next 3 days',
        value: '0_3',
      },
      {
        label: 'Next 7 days',
        value: '0_7',
      },
      {
        label: 'Next week',
        value: 'next-week',
      },
    ],
  },
};