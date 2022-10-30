import * as React from 'react';

import { Styled, sizes } from './headline.styles';

export type HeadlineSize = keyof typeof sizes;
export type HeadlineProps = React.ComponentProps<typeof Styled.Headline> & {
  /** Content of the headline */
  children: React.ReactNode;
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
