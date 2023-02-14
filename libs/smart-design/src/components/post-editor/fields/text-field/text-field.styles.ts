import styled from 'styled-components';

import { Body } from '../../../body';
import { Headline } from '../../../headline';

export const StyledBody = styled(Body)`
  width: 100%;
  min-height: 24px;
  overflow-wrap: anywhere;

  :focus {
    outline: none;
  }
`;

export const StyledHeadline = styled(Headline)`
  display: block;

  :focus {
    outline: none;
  }
  :empty:before {
    content: attr(data-placeholder);
    color: ${({ theme }) => theme.common.overBackgroundNeutral};
  }
`;
