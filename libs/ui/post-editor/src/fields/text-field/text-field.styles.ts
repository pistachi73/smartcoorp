import styled from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';

export const StyledBody = styled(Body)`
  width: 100%;
  min-height: 24px;
  overflow-wrap: anywhere;
  outline: none;
`;

export const StyledHeadline = styled(Headline)`
  width: 100%;
  overflow-wrap: anywhere;
  outline: none;

  :empty:before {
    content: attr(data-placeholder);
    color: ${({ theme }) => theme.common.overBackgroundNeutral};
  }
`;
