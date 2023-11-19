'use client';

import { styled } from 'styled-components';

import { spaceL } from '@smartcoorp/ui/tokens';

// -------POST CARD GRID STYLES-------
export const PostCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: ${spaceL};

  @media (min-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
