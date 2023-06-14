import { DateRange, SelectRangeEventHandler } from 'react-day-picker';

import { RangeCustomValuesOptions } from '@smartcoorp/ui/range-calendar';

import { sizes } from './date-picker.styles';

export type DatePickerSize = keyof typeof sizes;

type CommonProps = {
  /** Disable the input or textarea */
  isDisabled?: boolean;
  /** Set error state */
  isError?: boolean;
  /** The size on mobile screens or larger */
  size?: DatePickerSize;
  /** The size on tablet screens or larger */
  sizeConfined?: DatePickerSize;
  /** The size on desktop screens or larger */
  sizeWide?: DatePickerSize;
};

export type DateRangePickerProps = CommonProps & {
  /** The selected days. */
  selected?: DateRange | undefined;
  /** Event fired when a days added or removed to the selection. */
  onSelect?: SelectRangeEventHandler;
  /** The minimum amount of days that can be selected. */
  min?: number;
  /** The maximum amount of days that can be selected. */
  max?: number;
  /** Custom Presets */
  withCustomValues?: RangeCustomValuesOptions[];
};
// //   /** The selected days. */
