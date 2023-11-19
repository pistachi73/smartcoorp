'use client';

import { styled } from 'styled-components';

import { scale300, spaceXL, spaceXS } from '@smartcoorp/ui/tokens';

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
