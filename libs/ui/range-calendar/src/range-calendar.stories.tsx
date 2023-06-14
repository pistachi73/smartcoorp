import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { TemplateProps } from '@smartcoorp/ui/shared';

import { RangeCalendar } from './range-calendar';
import { RangeCalendarProps } from './range-calendar.types';
export default {
  title: 'Component/Calendar/Range Calendar',
  component: RangeCalendar,
  parameters: {
    docs: {
      description: {
        component:
          "A Calendar React component is a reusable UI element that displays dates and allows users to navigate through months and years. It provides a grid layout with cells representing days and can include features like highlighting today's date and selecting specific dates. It's highly customizable and promotes code modularity for date-centric applications.",
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as Meta<RangeCalendarProps>;

const RangeTemplate: StoryFn<RangeCalendarProps> = (
  args: RangeCalendarProps
) => {
  const [rangeSelect, setRangeSelect] = useState<DateRange | undefined>();

  return (
    <RangeCalendar
      selected={rangeSelect}
      onSelect={setRangeSelect}
      max={args?.max}
      min={args?.min}
      withCustomValues={args.withCustomValues}
      {...args}
    />
  );
};

export const Default: TemplateProps<RangeCalendarProps> = {
  render: RangeTemplate,
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'This is an example of how to use the component with range selectable values',
      },
    },
  },
};

export const RangeWithCustomValues: TemplateProps<RangeCalendarProps> = {
  render: RangeTemplate,
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
      { label: 'random', value: '-2_2' },
      {
        label: 'Next week',
        value: 'next-week',
      },
    ],
  },
  /** Add story descriotion */
  parameters: {
    docs: {
      description: {
        story:
          'This is an example of how to use the component with range selectable values and custom values',
      },
    },
  },
};
