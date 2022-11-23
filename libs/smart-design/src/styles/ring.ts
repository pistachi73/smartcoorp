import { css } from 'styled-components';

import { scale010, spaceXS } from '../tokens';

type RingProps = {
  width?: string;
  color: string;
  offset?: string;
};

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
