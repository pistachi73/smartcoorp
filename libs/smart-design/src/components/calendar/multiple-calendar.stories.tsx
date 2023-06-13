import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { TemplateProps } from '../../helpers';

import { MultipleCalendarProps } from './calendar.types';
import { MultipleCalendar } from './multiple-calendar';
export default {
  title: 'Component/Calendar/Multiple Calendar',
  component: MultipleCalendar,
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
} as Meta<MultipleCalendarProps>;
const MultipleTemplate: StoryFn<MultipleCalendarProps> = (args: any) => {
  const [multipleSelect, setMultipleSelect] = useState<Date[] | undefined>();

  return (
    <MultipleCalendar
      selected={multipleSelect}
      onSelect={setMultipleSelect}
      max={args?.max}
      min={args?.min}
      {...args}
    />
  );
};
export const Default: TemplateProps<MultipleCalendarProps> = {
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
