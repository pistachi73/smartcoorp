import {
  DayPickerMultipleProps,
  DayPickerRangeProps,
  DayPickerSingleProps,
} from 'react-day-picker';

export type RangeCustomValuesOptions = {
  label: string;
  value: `${number}_${number}` | 'next-week';
};

export type SingleCustomValuesOptions = {
  label: string;
  value: `${number}`;
};

export type SingleCalendarProps = Omit<DayPickerSingleProps, 'mode'> & {
  /** Include custom selec values */
  withCustomValues?: SingleCustomValuesOptions[];
  /** Remove Calendar borders */
  withBorder?: boolean;
};

export type MultipleCalendarProps = Omit<DayPickerMultipleProps, 'mode'> & {
  /** Remove Calendar borders */
  withBorder?: boolean;
};

export type RangeCalendarProps = Omit<DayPickerRangeProps, 'mode'> & {
  /** Include custom selec values */
  withCustomValues?: RangeCustomValuesOptions[];
  /** Remove Calendar borders */
  withBorder?: boolean;
};
