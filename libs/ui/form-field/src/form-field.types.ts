import { StyledComponentProps } from 'styled-components';

import { sizes } from './form-field.styles';

export type FormFieldSize = keyof typeof sizes;

type CommonProps = {
  /** Id */
  id?: string;
  /** Ref object */
  innerRef?: any;
  /** Formfield placeholder */
  placeholder?: string;
  /** FormField type */
  type?: HTMLInputElement['type'];
  /** Disable the input or textarea */
  isDisabled?: boolean;
  /** Set error state */
  isError?: boolean;
  /** Form field helper text */
  helperText?: string;
  /** The label attribute for the input element */
  label?: string;
  /** The size on mobile screens or larger */
  size?: FormFieldSize;
  /** The size on tablet screens or larger */
  sizeConfined?: FormFieldSize;
  /** The size on desktop screens or larger */
  sizeWide?: FormFieldSize;
  /** The value of the input */
  value?: string | number;
  /** The defaultValue of the input */
  defaultValue?: string | number;
  /** Render a textarea */
  isMultiline?: boolean;
  /** Add leading icon */
  icon?: React.FC<{ size: number }>;
  /** @callback */
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  /** @callback */
  onChange: (val: any) => void;
  /** @callback */
  onFocus?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export type FormFieldProps = StyledComponentProps<
  'input' | 'textarea' | 'p',
  any,
  CommonProps,
  never // `never` optional'ed attributes from .attrs
> & {
  // Add `as` and `forwardedAs` polymorphic props
  as?: string | React.ComponentType<any> | undefined;
  forwardedAs?: string | React.ComponentType<any> | undefined;
};
