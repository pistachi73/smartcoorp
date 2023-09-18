'use client';

import { css, styled } from 'styled-components';

import {
  blue700,
  gray600,
  primary,
  scale080,
  spaceXS,
  spaceXXL,
} from '@smartcoorp/ui/tokens';

export type Color = 'primary' | 'secondary' | 'neutral';

export const Container = styled.div`
  padding-left: ${spaceXXL};
  overflow: hidden;
`;

export const Item = styled.div`
  margin-block: ${spaceXS};
  display: block;
  max-width: 100%;

  font-size: ${scale080};
  line-height: 1.5;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Value = styled.span<{ $color?: Color }>`
  ${({ $color = 'neutral' }) =>
    $color === 'primary'
      ? css`
          color: ${primary};
        `
      : $color === 'secondary'
      ? css`
          color: ${blue700};
        `
      : $color === 'neutral'
      ? css`
          color: ${gray600};
        `
      : css`
          color: ${primary};
        `}
`;
