import React, { forwardRef } from 'react';

import { Styled } from './body.styles';
import { BodyProps } from './body.types';

export const Body = forwardRef(
  (
    {
      children,
      ellipsis,
      fontWeight = 'regular',
      lineHeight,
      noMargin,
      size = 'medium',
      sizeConfined,
      sizeWide,
      className,
      id,
      ...props
    }: BodyProps,
    ref?: React.Ref<HTMLParagraphElement>
  ) => (
    <Styled.Body
      id={id}
      ref={ref}
      $ellipsis={ellipsis}
      $fontWeight={fontWeight}
      $lineHeight={lineHeight}
      $noMargin={noMargin}
      $size={size}
      $sizeConfined={sizeConfined}
      $sizeWide={sizeWide}
      data-xds="Body"
      className={className}
      {...props}
    >
      {children}
    </Styled.Body>
  )
);

Body.displayName = 'Body';
