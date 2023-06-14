import { FC } from 'react';

import { Styled } from './width-limiter.styles';
import { WidthLimiterProps } from './width-limiter.types';

export const WidthLimiter: FC<WidthLimiterProps> = ({
  children,
  className,
}) => {
  return (
    <Styled.WidthLimiter className={className}>{children}</Styled.WidthLimiter>
  );
};

WidthLimiter.displayName = 'WidthLimiter';
