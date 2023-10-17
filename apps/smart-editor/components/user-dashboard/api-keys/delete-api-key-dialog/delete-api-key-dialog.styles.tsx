'use client';

import styled from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import {
  borderRadiusXS,
  gray100,
  gray300,
  scale270,
  spaceL,
  spaceS,
  spaceXL,
  spaceXS,
} from '@smartcoorp/ui/tokens';

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spaceXS};

  text-align: center;
`;

export const TrashImageContainer = styled.div`
  height: ${scale270};
  margin-bottom: ${spaceXL};

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ApiKeyBadgeContainer = styled.div`
  width: 100%;
  margin-block: ${spaceL};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spaceS};
`;
export const ApiKeyBadge = styled(Body)`
  display: inline-block;
  padding: ${spaceXS} ${spaceS};

  border: 1px solid ${gray300};
  background-color: ${gray100};
  border-radius: ${borderRadiusXS};
`;
