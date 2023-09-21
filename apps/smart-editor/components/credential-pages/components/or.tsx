import { Body } from '@smartcoorp/ui/body';

import { Or as StyledOr } from '../credential-pages.styles';

export const Or = () => (
  <StyledOr>
    <div />
    <Body size="xsmall" sizeWide="small" noMargin variant="neutral">
      or
    </Body>
    <div />
  </StyledOr>
);
