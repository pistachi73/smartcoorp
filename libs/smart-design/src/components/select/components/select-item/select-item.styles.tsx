import styled, { css } from 'styled-components';

import {
  borderRadiusXXS,
  primary,
  scale070,
  scale080,
  scale090,
  scale100,
  scale120,
  spaceM,
} from '../../../../tokens';

import { SelectItemSizes } from './select-item.types';

type SelectItemTransientProps = {
  $size: SelectItemSizes;
  $disabled?: boolean;
  $selected?: boolean;
  $semiSelected?: boolean;
};

type MultipleSelectCheckboxProps = {
  $selected?: boolean;
};

export const sizes = {
  small: css`
    font-size: ${scale070};
    padding: ${spaceM} ${scale090};
  `,

  medium: css`
    font-size: ${scale080};
    padding: ${spaceM} ${scale090};
  `,

  large: css`
    font-size: ${scale100};
    padding: ${spaceM} ${scale120};
  `,
};

const baseSelectItem = css`
  width: 100%;
  cursor: pointer;
  height: 100%;

  display: flex;
  align-items: center;
  position: relative;
  color: ${({ theme }) => theme.color.neutral};

  &:hover,
  &:focus {
    background-color: ${({ theme }) =>
      theme.select.selectItem.hoverBackgroundColor};
    outline: none;
  }
`;

const selected = css`
  background-color: ${({ theme }) =>
    theme.select.selectItem.selectedBackgroundColor};
  &:hover,
  &:focus {
    background-color: ${({ theme }) =>
      theme.select.selectItem.selectedHoverBackgroundColor};
  }
`;

const SelectItem = styled.li<SelectItemTransientProps>`
  ${baseSelectItem}
  ${({ $size }) => $size && sizes[$size]}
  ${({ $selected }) => $selected && selected}
`;

const multipleSelectCheckboxSelected = css`
  border-color: ${primary};
  color: ${({ theme }) => theme.color.neutral};
  background-color: ${primary};
`;

const MultipleSelectCheckbox = styled.div<MultipleSelectCheckboxProps>`
  width: ${scale080};
  height: ${scale080};
  border: 2px solid ${({ theme }) => theme.color.neutral};
  border-radius: ${borderRadiusXXS};
  margin-right: ${spaceM};

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $selected }) => $selected && multipleSelectCheckboxSelected}
`;

export const Styled = {
  SelectItem,
  MultipleSelectCheckbox,
};
