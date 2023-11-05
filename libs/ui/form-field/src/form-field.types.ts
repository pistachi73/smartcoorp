import { sizes } from './form-field.styles';

export type FormFieldSize = keyof typeof sizes;

type CommonProps = {
  /** Styles */
  className?: string;
  /** Id */
  id?: string;
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
  /** Render a textarea */
  maxChars?: number;
  /** Name of the field */
  name?: string;
  /** Forgot Password HREF */
  forgotPasswordHref?: string;
  /** Add leading icon */
  icon?: React.FC<{ size: number }>;
  /** @callback */
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  /** @callback */
  onChange?: (value: any) => void;
  /** @callback */
  onFocus?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  /** @callback */
  onKeyDown?: (e: React.KeyboardEvent) => void;
};

type InputProps = CommonProps & {
  /** FormField type */
  type?: HTMLInputElement['type'];
  /** Render a textarea */
  isMultiline?: never;
  /** Initiañ height of the text area */
  height?: never;
};

type TextareaProps = CommonProps & {
  /** Render a textarea */
  isMultiline?: boolean;
  /** Initial height of the text area */
  height?: number;
};

export type FormFieldProps = (InputProps | TextareaProps) &
  Omit<
    React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    'onChange'
  >;
