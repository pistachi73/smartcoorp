import styled, { css } from 'styled-components';

import {
  mediaConfined,
  mediaWide,
  scale060,
  scale070,
  scale080,
  scale090,
  scale100,
  spaceL,
  spaceM,
  spaceS,
} from '../../tokens';

import type {
  BodyCopyFontWeight,
  BodyCopyLineHeight,
  BodyCopySize,
} from './body.types';

type BodyTransientProps = {
  $ellipsis?: boolean;
  $fontWeight?: BodyCopyFontWeight;
  $lineHeight?: BodyCopyLineHeight;
  $noMargin?: boolean;
  $size: BodyCopySize;
  $sizeConfined?: BodyCopySize;
  $sizeWide?: BodyCopySize;
};

// *** Base ***
const baseBodyCopy = css`
  color: ${({ theme }) => theme.typography.bodyTextColor};
  line-height: 1.5;
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
  padding: 0;
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
  xsmall: css`
    font-size: ${scale060};
    margin-bottom: ${spaceS};
  `,
  small: css`
    font-size: ${scale070};
    margin-bottom: ${spaceM};
  `,
  medium: css`
    font-size: ${scale080};
    margin-bottom: ${spaceM};
  `,
  large: css`
    font-size: ${scale090};
    margin-bottom: ${spaceL};
  `,
  xlarge: css`
    font-size: ${scale100};
    margin-bottom: ${spaceL};
  `,
};

// *** Line-Heights ***
export const lineHeights = {
  dense: css`
    line-height: 1.25;
  `,
  increased: css`
    line-height: 1.65;
  `,
};

// *** Font-Weights ***
export const fontWeights = {
  regular: css`
    font-weight: 400;
  `,
  bold: css`
    font-weight: 700;
  `,
};

// *** Components ***
const Body = styled.p<BodyTransientProps>`
  font-weight: 700;
  ${baseBodyCopy};
  ${({ $lineHeight }) => $lineHeight && lineHeights[$lineHeight]};
  ${({ $fontWeight }) => $fontWeight && fontWeights[$fontWeight]};
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
  Body,
};
