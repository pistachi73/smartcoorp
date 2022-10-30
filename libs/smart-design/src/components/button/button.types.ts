import { Styled, sizes, variants } from './button.styles';

export type ButtonSizes = keyof typeof sizes;
export type ButtonVariants = keyof typeof variants;

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
  icon?: React.FC<{ size: number }>;
  /** Icon position by default is left. Set this prop to place it right */
  iconAfter?: boolean;
  /** Access the DOM node */
  innerRef?: React.RefObject<HTMLElement>;
  /** Loading state of the button */
  loading?: boolean;
  /** @callback */
  onClick?: (e: MouseEvent) => void;
  /** The variant of button */
  variant?: ButtonVariants;
  /** Icon size */
  iconSize?: number;
};

type ButtonHtmlProps = React.ComponentProps<typeof Styled.Button> &
  CommonProps & {
    /** External link navitagion */
    href?: never;
    /** Internal link navitagion */
    to?: never;
  };

type ButtonRouterLinkProps = React.ComponentProps<typeof Styled.LinkButton> &
  CommonProps;

export type ButtonProps = ButtonHtmlProps | ButtonRouterLinkProps;
