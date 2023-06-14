import { forwardRef } from 'react';

import { Styled } from './headline.styles';
import type { HeadlineProps } from './headline.types';

export const Headline = forwardRef<HTMLHeadingElement, HeadlineProps>(
  (
    {
      children,
      ellipsis,
      noMargin,
      className,
      size = 'medium',
      sizeConfined,
      sizeWide,
      ...props
    }: HeadlineProps,
    ref?: React.Ref<HTMLHeadingElement>
  ) => (
    <Styled.Headline
      ref={ref}
      className={className}
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
  )
);
