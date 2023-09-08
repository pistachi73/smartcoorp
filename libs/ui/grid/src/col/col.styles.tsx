'use client';

import styled, { css } from 'styled-components';

import { mediaConfined, mediaWide } from '@smartcoorp/ui/tokens';

import { defaultGapSpacing } from '../row/row.styles';

import { ColOffset, ColSizes } from './col.types';

type ColTransientProps = {
  $size: ColSizes;
  $sizeConfined?: ColSizes;
  $sizeWide?: ColSizes;
  $offset?: ColOffset;
  $offsetConfined?: ColOffset;
  $offsetWide?: ColOffset;
  $gap?: `${string}px`;
  $gapConfined?: `${string}px`;
  $gapWide?: `${string}px`;
};

export const Col = styled.div<ColTransientProps>`
  display: block;

  ${({ $size, $gap }) => css`
    flex-basis: calc(
      ${($size / 12) * 100}% - calc(${$gap || defaultGapSpacing.small} / 2)
    );
  `}

  ${({ $offset }) =>
    $offset &&
    css`
      margin-left: ${($offset / 12) * 100}%;
    `};

  @media ${mediaConfined} {
    ${({ $size, $sizeConfined, $gapConfined }) =>
      css`
        flex-basis: calc(
          ${(($sizeConfined || $size) / 12) * 100}% -
            calc(${$gapConfined || defaultGapSpacing.confined} / 2)
        );
      `}

    ${({ $offsetConfined }) =>
      $offsetConfined &&
      css`
        margin-left: ${($offsetConfined / 12) * 100}%;
      `}
  }

  @media ${mediaWide} {
    ${({ $sizeWide, $size, $sizeConfined, $gapConfined }) =>
      css`
        flex-basis: calc(
          ${(($sizeWide || $sizeConfined || $size) / 12) * 100}% -
            calc(${$gapConfined || defaultGapSpacing.wide} / 2)
        );
      `}

    ${({ $offsetWide }) =>
      $offsetWide &&
      css`
        margin-left: ${($offsetWide / 12) * 100}%;
      `}
  }
`;
