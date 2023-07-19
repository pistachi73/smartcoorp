'use client';

import styled from 'styled-components';

import {
  borderRadiusM,
  borderRadiusS,
  scale210,
  scale320,
  spaceL,
  spaceM,
  spaceS,
  spaceXL,
} from '@smartcoorp/ui/tokens';

export const EditLayoutContainer = styled.div`
  position: relative;
  margin-top: ${spaceXL};
  padding: ${spaceXL};
  background-color: ${({ theme }) => theme.color.invertedNeutral};
  border: 1px solid ${({ theme }) => theme.form.placeholderColor};
  border-radius: ${borderRadiusS};
`;
export const EditLayoutHeader = styled.div`
  width: 100%;
  padding-bottom: ${spaceXL};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spaceS};
  margin-bottom: ${spaceL};
`;

export const EditLayoutContentContainer = styled.form`
  width: 100%;
`;

export const EditLayoutHeaderActions = styled.div`
  height: 100%;
  display: flex;
  gap: ${spaceS};
  justify-content: flex-end;
  align-items: flex-end;
`;

export const TrashImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: ${spaceXL};
`;

export const LoadingContainer = styled.div`
  height: ${scale320};
  display: flex;
  justify-content: center;
  align-items: center;
`;
