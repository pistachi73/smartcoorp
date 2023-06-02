import React from 'react';
import ReactSelect from 'react-select';

import { sizes } from './select.styles';
export type SelectSizes = keyof typeof sizes;

export type Option = {
  label: string;
  value: string;
};

type OptionsGroup = {
  label: string;
  options: Option[];
};

export const isOption = (option: any): option is Option =>
  option.label !== undefined && option.value !== undefined;

export type SelectOptions = (Option | OptionsGroup)[];

export type SelectProps = {
  /** Select options */
  options: SelectOptions;
  /** Select @callback */
  onChange: (...props: any) => void;
  /** Select value */
  value?: string | string[];
  /** Select defaultValue */
  defaultValue?: string | string[];
  /** Single select placeholder */
  placeholder?: string;
  /** Single select label */
  label?: string;
  /** Single select helper text */
  helperText?: string;
  /** Has single select an error */
  isError?: boolean;
  /** Is Select disabled */
  isDisabled?: boolean;
  /** Is Select multiple */
  isMulti?: boolean;
  /** The size on mobile screens or larger */
  size?: SelectSizes;
  /** The size on tablet screens or larger */
  sizeConfined?: SelectSizes;
  /** The size on desktop screens or larger */
  sizeWide?: SelectSizes;
};
