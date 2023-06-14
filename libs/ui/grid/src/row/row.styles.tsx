import styled, { css } from 'styled-components';

import {
  mediaConfined,
  mediaWide,
  scale020,
  scale040,
  scale060,
} from '@smartcoorp/ui/tokens';

type RowTransientProps = {
  $noMargin?: boolean;
};

export const Row = styled.div<RowTransientProps>`
  display: flex;
  flex-wrap: wrap;

  margin-left: -${scale020};
  margin-right: -${scale020};

  ${({ $noMargin }) =>
    !$noMargin &&
    css`
      margin-bottom: calc(${scale020} * 2);
    `};

  @media ${mediaConfined} {
    margin-left: -${scale040};
    margin-right: -${scale040};

    ${({ $noMargin }) =>
      !$noMargin &&
      css`
        margin-bottom: calc(${scale040} * 2);
      `};
  }

  @media ${mediaWide} {
    margin-left: -${scale060};
    margin-right: -${scale060};

    ${({ $noMargin }) =>
      !$noMargin &&
      css`
        margin-bottom: calc(${scale060} * 2);
      `};
  }
`;
