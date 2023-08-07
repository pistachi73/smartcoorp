'use client';

import styled, { css } from 'styled-components';

import {
  mediaConfined,
  mediaWide,
  scale080,
  scale090,
  scale110,
  scale140,
  scale160,
  spaceM,
  spaceS,
} from '@smartcoorp/ui/tokens';

import { HeadlineSize } from './headline.types';

type HeadlineTransientProps = {
  $ellipsis?: boolean;
  $noMargin?: boolean;
  $size: HeadlineSize;
  $sizeConfined?: HeadlineSize;
  $sizeWide?: HeadlineSize;
};

// *** Base ***
const baseHeadline = css`
  color: ${({ theme }) => theme.typography.headlineTextColor};
  font-weight: 600;
  line-height: 1.25;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  padding: 0;
  letter-spacing: -0.05em;
`;

const noMargin = css`
  && {
    margin: 0;
  }
`;

const ellipsis = css`
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// *** Sizes ***
export const sizes = {
  small: css`
    font-size: ${scale080};
    margin-bottom: ${spaceS};
  `,
  medium: css`
    font-size: ${scale090};
    margin-bottom: ${spaceS};
  `,
  large: css`
    font-size: ${scale110};
    margin-bottom: ${spaceM};
  `,
  xlarge: css`
    font-size: 30px;
    margin-bottom: ${spaceM};
  `,
  xxlarge: css`
    font-size: ${scale140};
    margin-bottom: ${spaceM};
  `,
  xxxlarge: css`
    font-size: ${scale160};
    margin-bottom: ${spaceM};
  `,
};

// *** Components ***
const Headline = styled.h2<HeadlineTransientProps>`
  ${baseHeadline};
  ${({ $size }) => $size && sizes[$size]};

  ${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${sizes[$sizeConfined]}
      }
    `};

  ${({ $sizeWide }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${sizes[$sizeWide]}
      }
    `};

  ${({ $noMargin }) => $noMargin && noMargin};
  ${({ $ellipsis }) => $ellipsis && ellipsis};
`;

export const Styled = {
  Headline,
};
