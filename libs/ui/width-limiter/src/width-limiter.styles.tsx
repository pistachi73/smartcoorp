'use client';

import styled from 'styled-components';

import { mediaConfined, spaceL, spaceS } from '@smartcoorp/ui/tokens';

export const WidthLimiter = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;

  padding-left: ${spaceS};
  padding-right: ${spaceS};

  @media (${mediaConfined}) {
    padding-left: ${spaceL};
    padding-right: ${spaceL};
  }
`;
