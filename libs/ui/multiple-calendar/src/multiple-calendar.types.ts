import { DayPickerMultipleProps } from 'react-day-picker';

export type MultipleCalendarProps = Omit<DayPickerMultipleProps, 'mode'> & {
  /** Remove Calendar borders */
  withBorder?: boolean;
};
