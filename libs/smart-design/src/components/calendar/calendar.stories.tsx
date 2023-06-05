import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { TemplateProps } from '../../helpers';

import { Calendar } from './calendar';
import { CalendarProps } from './calendar.types';

export default {
  title: 'Component/Calendar',
  component: Calendar,
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
} as Meta<CalendarProps>;

const SingleTemplate: StoryFn<CalendarProps> = (args: any) => {
  const [singleSelect, setSingleSelect] = useState<Date | undefined>();

  return (
    <Calendar
      mode={'single'}
      selected={singleSelect}
      onSelect={setSingleSelect}
      withCustomValues={args?.withCustomValues}
    />
  );
};
const MultipleTemplate: StoryFn<CalendarProps> = (args: any) => {
  const [multipleSelect, setMultipleSelect] = useState<Date[] | undefined>();

  return (
    <Calendar
      mode={'multiple'}
      selected={multipleSelect}
      onSelect={setMultipleSelect}
      max={args?.max}
      min={args?.min}
    />
  );
};
const RangeTemplate: StoryFn<CalendarProps> = (args: any) => {
  const [rangeSelect, setRangeSelect] = useState<DateRange | undefined>();

  return (
    <Calendar
      mode={'range'}
      selected={rangeSelect}
      onSelect={setRangeSelect}
      max={args?.max}
      min={args?.min}
      withCustomValues={args.withCustomValues}
    />
  );
};
export const Default = {
  render: SingleTemplate,
  args: {},
};

export const WithCustomValues: TemplateProps<CalendarProps> = {
  render: SingleTemplate,
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
    docs: {
      description: {
        story:
          'This is an example of how to use the component with custom selectable values',
      },
    },
  },
};

export const Multiple: TemplateProps<CalendarProps> = {
  render: MultipleTemplate,
  args: {
    max: 4,
    min: 2,
  },
  parameters: {
    docs: {
      description: {
        story:
          /** Add story descriotion */
          'This is an example of how to use the component with multiple selectable values',
      },
    },
  },
};

export const Range: TemplateProps<CalendarProps> = {
  render: RangeTemplate,
  args: {
    mode: 'range',
  },
  parameters: {
    docs: {
      description: {
        story:
          'This is an example of how to use the component with range selectable values',
      },
    },
  },
};

export const RangeWithCustomValues: TemplateProps<CalendarProps> = {
  render: RangeTemplate,
  args: {
    mode: 'range',
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
