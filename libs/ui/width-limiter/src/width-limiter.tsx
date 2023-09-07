import { FC } from 'react';

import { WidthLimiter as StyledWidthLimiter } from './width-limiter.styles';
import { WidthLimiterProps } from './width-limiter.types';

export const WidthLimiter: FC<WidthLimiterProps> = ({
  children,
  className,
}) => {
  return (
    <StyledWidthLimiter className={className}>{children}</StyledWidthLimiter>
  );
};

WidthLimiter.displayName = 'WidthLimiter';
