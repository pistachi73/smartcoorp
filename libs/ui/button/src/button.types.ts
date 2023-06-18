import { IconType } from 'react-icons';
import { StyledComponentProps } from 'styled-components';

import { sizes, variants } from './button.styles';
export type ButtonSizes = keyof typeof sizes;
export type ButtonVariants = keyof ReturnType<typeof variants>;
export type ButtonColors =
  | 'primary'
  | 'neutral'
  | 'success'
  | 'error'
  | 'warning';

type CommonProps = {
  /** Content of the Button */
  children?: React.ReactNode;
  /** The size on mobile screens or larger */
  size?: ButtonSizes;
  /** The size on tablet screens or larger */
  sizeConfined?: ButtonSizes;
  /** The size on desktop screens or larger */
  sizeWide?: ButtonSizes;
  /** Disable the Button */
  disabled?: boolean;
  /** Hand over an icon component for the button */
  icon?: IconType;
  /** Icon position by default is left. Set this prop to place it right */
  iconAfter?: boolean;
  /** Access the DOM node */
  innerRef?: React.RefObject<HTMLElement>;
  /** Loading state of the button */
  loading?: boolean;
  /** Button colors variants */
  color?: ButtonColors;
  /** @callback */
  onClick?: any;
  /** The variant of button */
  variant?: ButtonVariants;
  /** Icon size */
  iconSize?: number;
  /** External link navitagion */
  href?: string;
  /** Internal link navitagion */
  to?: string;
};

export type ButtonProps = StyledComponentProps<
  'button' | 'a',
  any,
  CommonProps,
  never // `never` optional'ed attributes from .attrs
> & {
  // Add `as` and `forwardedAs` polymorphic props
  as?: string | React.ComponentType<any> | undefined;
  forwardedAs?: string | React.ComponentType<any> | undefined;
};
