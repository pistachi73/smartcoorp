import { DayPickerRangeProps } from 'react-day-picker';

export type RangeCustomValuesOptions = {
  label: string;
  value: `${number}_${number}` | 'next-week';
};

export type RangeCalendarProps = Omit<DayPickerRangeProps, 'mode'> & {
  /** Include custom selec values */
  withCustomValues?: RangeCustomValuesOptions[];
  /** Remove Calendar borders */
  withBorder?: boolean;
};
