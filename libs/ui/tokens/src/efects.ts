import { css } from 'styled-components';

import {
  motionEasingStandard,
  motionTimeXXS,
  primary,
  primary_RGBA,
} from './index';

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
