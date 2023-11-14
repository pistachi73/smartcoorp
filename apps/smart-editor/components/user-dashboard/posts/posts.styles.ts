'use client';

import { styled } from 'styled-components';

import { scale300, spaceL, spaceXL, spaceXS } from '@smartcoorp/ui/tokens';

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

export const DeleteDialogTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spaceXS};

  text-align: center;
`;
