import * as React from 'react';

import { Styled, fontWeights, sizes } from './hero.styles';

export type HeroSize = keyof typeof sizes;
export type HeroFontWeight = keyof typeof fontWeights;
export type HeroProps = React.ComponentProps<typeof Styled.Hero> & {
  /** Content of the hero */
  children: React.ReactNode;
  /** Add custom CSS */
  fontWeight?: HeroFontWeight;
  /** Remove margin-bottom */
  noMargin?: boolean;
  /** The size on mobile screens or larger */
  size?: HeroSize;
  /** The size on tablet screens or larger */
  sizeConfined?: HeroSize;
  /** The size on desktop screens or larger */
  sizeWide?: HeroSize;
};
