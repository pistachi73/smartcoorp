import {
  DayPickerDefaultProps,
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

type DatePickerProps =
  | DayPickerDefaultProps
  | (DayPickerSingleProps & {
      /** Include custom selec values */
      withCustomValues?: SingleCustomValuesOptions[];
    })
  | DayPickerMultipleProps
  | (DayPickerRangeProps & {
      /** Include custom selec values */
      withCustomValues?: RangeCustomValuesOptions[];
    });
export type CalendarProps = DatePickerProps & {
  /** Include custom selec values */
};
