import styled, { css } from 'styled-components';

import { mediaConfined, mediaWide } from '../../../../tokens';
import { sizes } from '../../select.styles';
import { SelectSizes } from '../../select.types';

type SelectValueTransientProps = {
  $size: SelectSizes;
  $sizeConfined?: SelectSizes;
  $sizeWide?: SelectSizes;
};

export const ValueContainer = styled.button<SelectValueTransientProps>`
  width: 100%;

  cursor: pointer;

  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;

  ${({ $size }) => $size && sizes[$size].value}

  ${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${$sizeConfined && sizes[$sizeConfined].value}
      }
    `};

  ${({ $sizeWide }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${$sizeWide && sizes[$sizeWide].value}
      }
    `};
`;

export const Value = styled.span`
  color: ${({ theme }) => theme.color.neutral};

  height: auto;
  margin: 0;
  padding: 0;
  display: inline;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;
