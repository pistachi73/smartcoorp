import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import styled from 'styled-components';

import { TemplateProps } from '@smartcoorp/ui/shared';

import { DateRangePicker } from './date-range-picker';
import { DateRangePickerProps } from './date-range-picker.types';

export default {
  title: 'Form/Date Picker/Date Range Picker',
  component: DateRangePicker,
  parameters: {
    docs: {
      description: {
        component:
          'The Date Range Picker component in our React component library simplifies date selection for users. It provides an interactive calendar interface, allowing users to choose dates with ease. The selected date is automatically displayed in an input field. The component offers customization options, localization support, and adheres to accessibility guidelines. It also allows for date restrictions. Enhance user experience and streamline date selection in your React application with our Date Range Picker component.',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as Meta<DateRangePickerProps>;

const Container = styled.div`
  width: 298px;
`;
const Template: StoryFn<DateRangePickerProps> = (args) => {
  const [singleSelect, setSingleSelect] = useState<DateRange | undefined>();

  return (
    <Container>
      <DateRangePicker
        selected={singleSelect}
        onSelect={setSingleSelect}
        max={args?.max}
        min={args?.min}
        withCustomValues={args.withCustomValues}
      />
    </Container>
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
  /** Add a descriptioon to the story */
  parameters: {
    docs: {
      description: {
        story: 'Example with custom selectable values',
      },
    },
  },
};
