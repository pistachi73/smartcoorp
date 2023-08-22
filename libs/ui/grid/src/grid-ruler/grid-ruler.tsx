import React from 'react';
import styled from 'styled-components';

import {
  gray400_RGBA,
  mediaConfined,
  mediaWide,
  scale020,
  scale040,
  scale060,
} from '@smartcoorp/ui/tokens';

const StyledGridRuler = styled.div`
  position: absolute;
  z-index: 0;
  display: grid;
  width: 100%;
  min-height: 50vh;
  height: 100%;
  grid-template-columns: repeat(12, 1fr);

  column-gap: calc(${scale020} * 2);

  @media ${mediaConfined} {
    column-gap: calc(${scale040} * 2);
  }

  @media ${mediaWide} {
    column-gap: calc(${scale060} * 2);
  }
`;

const GridRulerCol = styled.div`
  background-color: rgba(${gray400_RGBA}, 0.1);
`;

export const GridRuler: React.FC = () => {
  return (
    <StyledGridRuler>
      {Array.from({ length: 12 }, () => (
        <GridRulerCol />
      ))}
    </StyledGridRuler>
  );
};
