import { ReactElement } from 'react';

import { SingleSelectItem } from './single-select';
import { sizes } from './single-select.styles';

export type SingleSelectSizes = keyof typeof sizes;

export type SingleSlectProps = {
  children:
    | ReactElement<SingleSelectItemProps>
    | Array<ReactElement<SingleSelectItemProps>>;
  /** Accessibility aria-label */
  ariaLabel: string;
  /** Value */
  value: string;
  /** @callback */
  onValueChange: (value: string) => void;
  /** Single select label */
  label?: string;
  /** Default value */
  defaultValue?: string;
  /**  */
  helperText?: string;
  /** Has single select an error */
  error?: boolean;
  /** Is SingleSelect disabled */
  disabled?: boolean;
  /** Value placeolder */
  placeholder?: string;
  /** The size on mobile screens or larger */
  size?: SingleSelectSizes;
  /** The size on tablet screens or larger */
  sizeConfined?: SingleSelectSizes;
  /** The size on desktop screens or larger */
  sizeWide?: SingleSelectSizes;
};

export type SingleSelectItemProps = {
  children: React.ReactNode;
  value: string;
  /** The size on mobile screens or larger */
  size?: SingleSelectSizes;
  /** The size on tablet screens or larger */
  sizeConfined?: SingleSelectSizes;
  /** The size on desktop screens or larger */
  sizeWide?: SingleSelectSizes;
};

export type SingleSelectItemGroupProps = {
  children:
    | ReactElement<SingleSelectItemProps>
    | Array<ReactElement<SingleSelectItemProps>>;
  label: string;
  /** The size on mobile screens or larger */
  size?: SingleSelectSizes;
  /** The size on tablet screens or larger */
  sizeConfined?: SingleSelectSizes;
  /** The size on desktop screens or larger */
  sizeWide?: SingleSelectSizes;
};
