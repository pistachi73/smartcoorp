import styled from 'styled-components';

import { spaceL } from '../../tokens';

const WidthLimiter = styled.div`
  margin: 0 auto;
  max-width: 1320px;
  width: 100%;

  padding-left: ${spaceL};
  padding-right: ${spaceL};
`;

export const Styled = {
  WidthLimiter,
};
