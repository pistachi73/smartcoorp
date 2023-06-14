import { SelectSingleEventHandler } from 'react-day-picker';

import { SingleCustomValuesOptions } from '@smartcoorp/ui/single-calendar';

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

export type DateSinglePickerProps = CommonProps & {
  /** Selected dates */
  selected?: Date;
  /** @callback */
  onSelect?: SelectSingleEventHandler;
  /** Custom Presets */
  withCustomValues?: SingleCustomValuesOptions[];
};
