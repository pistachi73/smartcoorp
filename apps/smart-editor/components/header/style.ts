'use client';

import { css, styled } from 'styled-components';

import { scale170, scale190, spaceL } from '@smartcoorp/ui/tokens';
import { WidthLimiter } from '@smartcoorp/ui/width-limiter';

export const HeaderContainer = styled.div`
  height: ${scale190};
  display: flex;
  align-items: center;

  ${({ theme: { SmartEditor } }) => css`
    background-color: ${SmartEditor.header.backgroundColor};
    border-bottom: 1px solid ${SmartEditor.header.borderColor};
  `}
`;

export const StyledWidthLimiter = styled(WidthLimiter)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AccountButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spaceL};
`;
