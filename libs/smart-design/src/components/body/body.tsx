import React, { FC } from 'react';

import { Styled } from './body.styles';
import { BodyProps } from './body.types';

export const Body: FC<BodyProps> = ({
  children,
  ellipsis,
  fontWeight = 'regular',
  lineHeight,
  noMargin,
  size = 'medium',
  sizeConfined,
  sizeWide,
  className,
  ...props
}) => {
  return (
    <Styled.Body
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
  );
};

Body.displayName = 'Body';
