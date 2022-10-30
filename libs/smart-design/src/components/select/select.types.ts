import { Styled, sizes } from './select.styles';

export type SelectSizes = keyof typeof sizes;
export type SelectOption = { label: string; value: string };

type BaseSelectProps = {
  /** Add custom css to select */
  className?: string;
  /** Id for the Select */
  id: string;
  /** Select options */
  options: SelectOption[];
  /** Disable the input or textarea */
  disabled?: boolean;
  /** Set error state */
  error?: boolean;
  /** Set error message */
  errorMessage?: string;
  /** Ref object */
  innerRef?: any;
  /** The size on mobile screens or larger */
  size?: SelectSizes;
  /** The size on tablet screens or larger */
  sizeConfined?: SelectSizes;
  /** The size on desktop screens or larger */
  sizeWide?: SelectSizes;
};

type LabelProps =
  | {
      /** The label attribute for the `Select` component.
       * @description If `label` attribute is used, don't set ~~`labelDescription`~~ attribute. `label` will be used for **ARIA** attributes
       */
      label: string;
      labelDescription?: never;
    }
  | {
      label?: never;
      /** The aria-label attribute to descrbe `Select` component.
       * @description `labelDescription` attribute is used to cover all used **ARIA** attributes. Don't set ~~`label`~~ attribute.
       */
      labelDescription: string;
    };

export type MultipleSelectProps = BaseSelectProps &
  LabelProps & {
    /** Enable select all option */
    selectAllOption?: boolean;
    /** Default value for Select component */
    defaultValue?: string[];
    /** @callback */
    onChange: (options: string[] | undefined) => void;
  };

export type SingleSelectProps = BaseSelectProps &
  LabelProps & {
    defaultValue?: string;
    /** @callback */
    onChange: (options: string | undefined) => void;
  };
