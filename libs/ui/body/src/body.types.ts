import React from 'react';
import { StyledComponentProps } from 'styled-components';

import { fontWeights, lineHeights, sizes } from './body.styles';

export type BodyCopySize = keyof typeof sizes;
export type BodyCopyLineHeight = keyof typeof lineHeights;
export type BodyCopyFontWeight = keyof typeof fontWeights;
export type BodyCopyVariants =
  | 'primary'
  | 'neutral'
  | 'success'
  | 'error'
  | 'warning';

type CommonProps = {
  /** Id of the body */
  id?: string;
  /** Content of the body copy */
  children?: React.ReactNode;
  /** Custom css className */
  className?: string;
  /** Activate text truncation */
  ellipsis?: boolean;
  /** Set font-weight */
  fontWeight?: BodyCopyFontWeight;
  /** Decrease or increase line-height */
  lineHeight?: BodyCopyLineHeight;
  /** Remove margin-bottom */
  noMargin?: boolean;
  /** Body variants */
  variant?: BodyCopyVariants;
  /** The size on mobile screens or larger */
  size?: BodyCopySize;
  /** The size on tablet screens or larger */
  sizeConfined?: BodyCopySize;
  /** The size on desktop screens or larger */
  sizeWide?: BodyCopySize;
};

export type BodyProps = StyledComponentProps<
  'button' | 'a',
  any,
  CommonProps,
  never // `never` optional'ed attributes from .attrs
> & {
  // Add `as` and `forwardedAs` polymorphic props
  as?: string | React.ComponentType<any> | undefined;
  forwardedAs?: string | React.ComponentType<any> | undefined;
};
