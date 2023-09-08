'use client';

import { css } from 'styled-components';

import { primary, primary_RGBA } from './color';
import { motionEasingStandard, motionTimeXXS } from './motion';

export const focusShadow = css`
  transition-property: box-shadow;
  transition-duration: ${motionTimeXXS};
  transition-timing-function: ${motionEasingStandard};
  border-width: 1px;
  border-style: solid;

  outline: none;
  box-shadow: 0 0 0 3px rgba(${primary_RGBA}, 0.25);
  border-color: ${primary} !important;
`;

export const getFocusShadow = ({
  color = primary,
  colorRGBA = primary_RGBA,
  shadowWidth = 3,
}: {
  color?: string;
  colorRGBA?: string;
  shadowWidth?: number;
}) => css`
  transition-property: box-shadow;
  transition-duration: ${motionTimeXXS};
  transition-timing-function: ${motionEasingStandard};

  border-width: 1px;
  border-style: solid;

  outline: none;
  box-shadow: 0 0 0 ${shadowWidth}px rgba(${colorRGBA}, 0.25);
  border-color: ${color} !important;
`;
