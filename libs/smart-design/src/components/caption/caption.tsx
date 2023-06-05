import { FC } from 'react';

import { Styled } from './caption.styles';
import type { CaptionProps } from './caption.types';

export const Caption: FC<CaptionProps> = ({
  children,
  ellipsis,
  fontWeight = 'regular',
  lineHeight,
  noMargin,
  ...props
}) => (
  <Styled.Caption
    $ellipsis={ellipsis}
    $fontWeight={fontWeight}
    $lineHeight={lineHeight}
    $noMargin={noMargin}
    data-xds="Caption"
    {...props}
  >
    {children}
  </Styled.Caption>
);
