import { sizes } from './checkbox.styles';
export type CheckboxSize = keyof typeof sizes;

type CheckedState = boolean;
export type CheckboxProps = {
  /** Checkbox value */
  checked?: CheckedState;
  /** Is intermediate check */
  intermediate?: CheckedState;
  /** Ref object */
  innerRef?: any;
  /**Checkbox Id */
  id?: string;
  /** Checkbox Label */
  label?: string;
  /** Is Defaulty checked */
  defaultValue?: CheckedState;
  /** Is Checkbox disabled */
  isDisabled?: boolean;
  /** The size on mobile screens or larger */
  size?: CheckboxSize;
  /** The size on tablet screens or larger */
  sizeConfined?: CheckboxSize;
  /** The size on desktop screens or larger */
  sizeWide?: CheckboxSize;
  /** @callback */
  onChange: (val: any) => void;
};
