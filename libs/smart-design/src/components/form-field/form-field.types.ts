import { Styled, sizes, variants } from './form-field.styles';

export type FormFieldSize = keyof typeof sizes;
export type FormFieldVariant = keyof typeof variants;

type CommonProps = {
  /** Disable the input or textarea */
  disabled?: boolean;
  /** Set error state */
  error?: boolean;
  /** Set error message */
  errorMessage?: string;
  /** The id attribute of the input or textarea */
  id: string;
  /** The label attribute for the input element */
  label?: string;
  /** The size on mobile screens or larger */
  size?: FormFieldSize;
  /** The size on tablet screens or larger */
  sizeConfined?: FormFieldSize;
  /** The size on desktop screens or larger */
  sizeWide?: FormFieldSize;
  /** Set success state */
  success?: boolean;
  /** The value attribute of the input or textarea */
  value?: string;
};

type InputProps = React.ComponentProps<typeof Styled.Input> &
  CommonProps & {
    /** Set FromField Variant */
    variant?: FormFieldVariant;
    /** Add leading icon */
    icon?: React.FC<{ size: number }>;
    /** Ref object */
    innerRef?: React.RefObject<typeof Styled.Input>;
    /** Render a textarea */
    multiline?: never;
    /** @callback */
    onBlur?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    /** @callback */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /** @callback */
    onFocus?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  };

type TextareaProps = React.ComponentProps<typeof Styled.Textarea> &
  CommonProps & {
    /** Set FromField Variant */
    variant?: never;
    /** Add leading icon */
    icon?: never;
    /** Ref object */
    innerRef?: React.RefObject<typeof Styled.Textarea>;
    /** Render a textarea */
    multiline?: boolean;
    /** @callback */
    onBlur?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    /** @callback */
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    /** @callback */
    onFocus?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  };

export type FormFieldProps = InputProps | TextareaProps;
