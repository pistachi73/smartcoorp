import { DayPickerSingleProps } from 'react-day-picker';

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
