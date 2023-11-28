'use client';

import styled from 'styled-components';

import {
  gray300,
  mediaConfined,
  primary,
  scale140,
  scale180,
  spaceL,
  spaceM,
  spaceS,
} from '@smartcoorp/ui/tokens';
import { WidthLimiter } from '@smartcoorp/ui/width-limiter';

export const HeaderContainer = styled.header`
  height: ${scale180};
  display: flex;
  align-items: center;

  position: sticky;
  top: 0;
  z-index: 20;

  background-color: white;
  border-bottom: 1px solid ${gray300};
`;

export const StyledWidthLimiter = styled(WidthLimiter)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// LEFT CONTAINER
export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Separator = styled.div`
  width: 1px;
  height: ${scale140};
  background: ${gray300};
  margin: 0 ${spaceS};

  @media ${mediaConfined} {
    margin: 0 ${spaceM};
  }
`;

export const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spaceM};
`;

// RIGHT CONTAINER
export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spaceL};

  a {
    &:hover {
      text-decoration: none;
    }
  }
`;

export const AvatarContainer = styled.div`
  position: relative;
  width: ${scale140};
  height: ${scale140};
  border-radius: 50%;
  border: 1px solid ${primary};
  overflow: hidden;
`;
