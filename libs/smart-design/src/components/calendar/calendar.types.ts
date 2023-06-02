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

// SingleDate;
// SingleDate;
// SingleDate;
// interface SingleDate {
//   mode: 'single';
//   /** Selected dates */
//   selected?: Date;
//   /** @callback */
//   onSelect?: SelectSingleEventHandler;
//   /** The minimum amount of days that can be selected. */
//   min?: never;
//   /** The maximum amount of days that can be selected. */
//   max?: never;
// }
// interface MultipleDates {
//   mode: 'multiple';
//   /** The selected days. */
//   selected?: Date[] | undefined;
//   /** Event fired when a days added or removed to the selection. */
//   onSelect?: SelectMultipleEventHandler;
//   /** The minimum amount of days that can be selected. */
//   min?: number;
//   /** The maximum amount of days that can be selected. */
//   max?: number;
// }

// interface RangeDates {
//   mode: 'range';
//   /** Selected dates */
//   selected?: DateRange;
//   /** @callback */
//   onSelect?: SelectRangeEventHandler;
//   /** The minimum amount of days that can be selected. */
//   min?: number;
//   /** The maximum amount of days that can be selected. */
//   max?: number;
// }
