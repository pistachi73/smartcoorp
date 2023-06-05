import { FC, forwardRef } from 'react';

import { Styled } from './hero.styles';
import { HeroProps } from './hero.types';

export const Hero: FC<HeroProps> = forwardRef(
  (
    {
      children,
      className,
      noMargin,
      size = 'medium',
      fontWeight = 'regular',
      sizeConfined,
      sizeWide,
      ...props
    }: HeroProps,
    forwardedRef: any
  ) => (
    <Styled.Hero
      red={forwardedRef}
      $noMargin={noMargin}
      $size={size}
      $fontWeight={fontWeight}
      $sizeConfined={sizeConfined}
      $sizeWide={sizeWide}
      className={className}
      data-xds="Hero"
      {...props}
    >
      {children}
    </Styled.Hero>
  )
);

Hero.displayName = 'Hero';
