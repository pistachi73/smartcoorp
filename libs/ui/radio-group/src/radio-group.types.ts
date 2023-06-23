import { sizes } from './radio-group.styles';
export type RadioGroupSize = keyof typeof sizes;

type RadioGroupOptions = {
  /** Radio item label */
  label: string;
  /** Radio item value */
  value: string;
};

export type RadioGroupProps = {
  /** Radio group label */
  label?: string;
  /**The value of the radio item that should be checked when initially rendered. Use when you do not need to control the state of the radio items. */
  defaultValue?: string;
  /**The controlled value of the radio item to check. Should be used in conjunction with onValueChange. */
  value?: string;
  /**Event handler called when the value changes. */
  onChange?: (value: string) => void;
  /**When true, prevents the user from interacting with radio items. */
  isDisabled?: boolean;
  /**Error state */
  isError?: boolean;
  /** Radio Group Options */
  options: RadioGroupOptions[];
  /** The size on mobile screens or larger */
  size?: RadioGroupSize;
  /** The size on tablet screens or larger */
  sizeConfined?: RadioGroupSize;
  /** The size on desktop screens or larger */
  sizeWide?: RadioGroupSize;
};

export type RadioGroupItemProps = {
  label: string;
  value: string;
  /**Error state */
  isError?: boolean;
  /** The size on mobile screens or larger */
  size?: RadioGroupSize;
  /** The size on tablet screens or larger */
  sizeConfined?: RadioGroupSize;
  /** The size on desktop screens or larger */
  sizeWide?: RadioGroupSize;
};
