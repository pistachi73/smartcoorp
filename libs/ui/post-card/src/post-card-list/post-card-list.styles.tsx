import { styled } from 'styled-components';

import {
  mediaConfined,
  mediaSmall,
  mediaWide,
  spaceL,
  spaceM,
  spaceS,
  spaceXL,
  spaceXXL,
} from '@smartcoorp/ui/tokens';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  gap: ${spaceXXL};

  @media ${mediaSmall} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${mediaConfined} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Styled = { Container };
