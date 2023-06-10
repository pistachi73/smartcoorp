import { css } from 'styled-components';

import {
  motionEasingStandard,
  motionTimeXXS,
  primary,
  primary_RGBA,
  scale010,
  spaceXS,
} from '../tokens';

type RingProps = {
  width?: string;
  color: string;
  offset?: string;
};

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

export const focusRing = ({
  width = scale010,
  color,
  offset = spaceXS,
}: RingProps) => css`
  @media (prefers-reduced-motion: no-preference) {
    :focus-visible {
      transition: outline-offset 75ms ease-out;
      outline-color: ${color};
      outline-width: ${width};
    }
  }

  :not(:active):focus-visible {
    outline-offset: calc(${offset} - 1px);
  }

  :active {
    /* outline-offset: calc(${offset} - 2px); */
  }
`;
