import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { TemplateProps } from '@smartcoorp/ui/shared';

import { SingleCalendar } from './single-calendar';
import { SingleCalendarProps } from './single-calendar.types';
export default {
  title: 'Component/Calendar/SingleCalendar',
  component: SingleCalendar,
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
} as Meta<SingleCalendarProps>;

const SingleTemplate: StoryFn<SingleCalendarProps> = (
  args: SingleCalendarProps
) => {
  const [singleSelect, setSingleSelect] = useState<Date | undefined>();

  return (
    <SingleCalendar
      selected={singleSelect}
      onSelect={setSingleSelect}
      withCustomValues={args?.withCustomValues}
      {...args}
    />
  );
};

export const Default = {
  render: SingleTemplate,
  args: {},
};

export const WithCustomValues: TemplateProps<SingleCalendarProps> = {
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
