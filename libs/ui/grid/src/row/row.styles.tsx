'use client';

import styled, { css } from 'styled-components';

import {
  mediaConfined,
  mediaWide,
  scale020,
  scale040,
  scale060,
  spaceL,
  spaceM,
  spaceXL,
} from '@smartcoorp/ui/tokens';

type RowTransientProps = {
  $noMargin?: boolean;
  $gap?: `${string}px`;
  $gapConfined?: `${string}px`;
  $gapWide?: `${string}px`;
};

export const defaultGapSpacing = {
  small: spaceM,
  confined: spaceL,
  wide: spaceXL,
};

export const Row = styled.div<RowTransientProps>`
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;

  gap: ${({ $gap }) => $gap || defaultGapSpacing.small};

  ${({ $noMargin }) =>
    !$noMargin &&
    css`
      margin-bottom: calc(${defaultGapSpacing.small} * 2);
    `};

  @media ${mediaConfined} {
    ${({ $noMargin }) =>
      !$noMargin &&
      css`
        margin-bottom: calc(${defaultGapSpacing.confined} * 2);
      `};
    gap: ${({ $gapConfined }) => $gapConfined || defaultGapSpacing.confined};
  }

  @media ${mediaWide} {
    ${({ $noMargin }) =>
      !$noMargin &&
      css`
        margin-bottom: calc(${defaultGapSpacing.wide} * 2);
      `};
    gap: ${({ $gapWide }) => $gapWide || defaultGapSpacing.wide};
  }
`;
