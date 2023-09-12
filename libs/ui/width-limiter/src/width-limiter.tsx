import { WidthLimiter as StyledWidthLimiter } from './width-limiter.styles';
import { WidthLimiterProps } from './width-limiter.types';

export const WidthLimiter = ({ children, className }: WidthLimiterProps) => {
  return (
    <StyledWidthLimiter className={className}>{children}</StyledWidthLimiter>
  );
};

WidthLimiter.displayName = 'WidthLimiter';
