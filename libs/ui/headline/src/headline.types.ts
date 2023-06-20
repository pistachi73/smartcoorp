import * as React from 'react';
import { StyledComponentProps } from 'styled-components';

import { sizes } from './headline.styles';

export type HeadlineSize = keyof typeof sizes;
export type CommonProps = {
  /** Content of the headline */
  children?: React.ReactNode;
  /** Custom styling */
  className?: string;
  /** Activate text truncation */
  ellipsis?: boolean;
  /** Remove margin-bottom */
  noMargin?: boolean;
  /** The size on mobile screens or larger */
  size?: HeadlineSize;
  /** The size on tablet screens or larger */
  sizeConfined?: HeadlineSize;
  /** The size on desktop screens or larger */
  sizeWide?: HeadlineSize;
};

export type HeadlineProps = StyledComponentProps<
  'h1',
  any,
  CommonProps,
  never // `never` optional'ed attributes from .attrs
> & {
  // Add `as` and `forwardedAs` polymorphic props
  as?: string | React.ComponentType<any> | undefined;
  forwardedAs?: string | React.ComponentType<any> | undefined;
};
