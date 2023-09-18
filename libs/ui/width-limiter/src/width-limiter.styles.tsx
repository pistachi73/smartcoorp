'use client';

import styled from 'styled-components';

import { mediaConfined, spaceL, spaceM } from '@smartcoorp/ui/tokens';

export const WidthLimiter = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;

  padding-left: ${spaceM};
  padding-right: ${spaceM};

  @media (${mediaConfined}) {
    padding-left: ${spaceL};
    padding-right: ${spaceL};
  }
`;
