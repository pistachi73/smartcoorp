import * as React from 'react';

import { Styled } from './headline.styles';
import type { HeadlineProps } from './headline.types';

export const Headline = ({
  children,
  ellipsis,
  noMargin,
  size = 'medium',
  sizeConfined,
  sizeWide,
  ...props
}: HeadlineProps) => (
  <Styled.Headline
    $ellipsis={ellipsis}
    $noMargin={noMargin}
    $size={size}
    $sizeConfined={sizeConfined}
    $sizeWide={sizeWide}
    data-xds="Headline"
    {...props}
  >
    {children}
  </Styled.Headline>
);

Headline.displayName = 'Headline';
