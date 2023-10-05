'use client';

import { styled } from 'styled-components';

import { scale300, spaceL, spaceXL } from '@smartcoorp/ui/tokens';

// -------POST CARD GRID STYLES-------
export const PostCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: ${spaceL};

  @media (min-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1292px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// -------DELETE POST -------
export const TrashImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spaceXL};

  img {
    height: ${scale300};
    width: auto;
  }
`;
