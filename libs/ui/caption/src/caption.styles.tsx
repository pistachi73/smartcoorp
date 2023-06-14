import styled, { css } from 'styled-components';

import { scale050 } from '@smartcoorp/ui/tokens';

import type { CaptionFontWeight, CaptionLineHeight } from './caption.types';

type CaptionTransientProps = {
  $ellipsis?: boolean;
  $fontWeight?: CaptionFontWeight;
  $lineHeight?: CaptionLineHeight;
  $noMargin?: boolean;
};

// *** Base ***
const baseCaption = css`
  color: ${({ theme }) => theme.typography.captionTextColor} !important;
  font-size: ${scale050};
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
    font-weight: 600;
  `,
};

// *** Components ***
const Caption = styled.p<CaptionTransientProps>`
  ${baseCaption};
  ${({ $lineHeight }) => $lineHeight && lineHeights[$lineHeight]};
  ${({ $fontWeight }) => $fontWeight && fontWeights[$fontWeight]};
  ${({ $noMargin }) => $noMargin && noMargin};
  ${({ $ellipsis }) => $ellipsis && ellipsis};
`;

export const Styled = {
  Caption,
};
