import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import styled, { css } from 'styled-components';

import {
  focusShadow,
  mediaConfined,
  mediaWide,
  primary,
  scale040,
  scale050,
  scale060,
  scale070,
  scale080,
  scale100,
  scale110,
  spaceM,
  spaceS,
  spaceXS,
  spaceXXS,
} from '@smartcoorp/ui/tokens';

import { RadioGroupSize } from './radio-group.types';

type SizeProps = {
  $size?: RadioGroupSize;
  $sizeConfined?: RadioGroupSize;
  $sizeWide?: RadioGroupSize;
};

type Error = {
  $isError?: boolean;
};

export const sizes = {
  small: {
    checkbox: css`
      width: ${scale100};
      height: ${scale100};
    `,
    indicator: css`
      width: ${scale040};
      height: ${scale040};
    `,
    label: css`
      font-size: ${scale070};
      padding: ${spaceXS} ${spaceM};
    `,
    radioGroupLabel: css`
      font-size: ${scale060};
    `,
  },
  medium: {
    checkbox: css`
      width: ${scale110};
      height: ${scale110};
    `,
    indicator: css`
      width: ${scale050};
      height: ${scale050};
    `,

    label: css`
      font-size: ${scale080};
      padding: ${spaceS} ${spaceM};
    `,
    radioGroupLabel: css`
      font-size: ${scale070};
    `,
  },
};

export const Root = styled(RadioGroupPrimitive.Root)<{ $disabled?: boolean }>`
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.35;
      pointer-events: none;
    `}
`;
export const Label = styled.label<SizeProps>`
  color: ${({ theme }) => theme.color.neutral};
  /** Size styles */
  ${({ $size }) =>
    $size &&
    css`
      ${sizes[$size].label}
    `}

  ${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${sizes[$sizeConfined].label}
      }
    `};

  ${({ $sizeWide }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${$sizeWide && sizes[$sizeWide].label}
      }
    `};
`;

export const Indicator = styled(RadioGroupPrimitive.Indicator)<SizeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    content: '';
    display: block;
    border-radius: 100%;
    background-color: ${primary};
    ${({ $size }) =>
      $size &&
      css`
        ${sizes[$size].indicator}
      `}

    ${({ $sizeConfined }) =>
      $sizeConfined &&
      css`
        @media ${mediaConfined} {
          ${sizes[$sizeConfined].indicator}
        }
      `};

    ${({ $sizeWide }) =>
      $sizeWide &&
      css`
        @media ${mediaWide} {
          ${$sizeWide && sizes[$sizeWide].indicator}
        }
      `};
  }
`;

export const Item = styled(RadioGroupPrimitive.Item)<SizeProps & Error>`
  width: ${scale110};
  height: ${scale110};

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.form.neutralColor};
  box-shadow: ${({ theme }) => theme.shadow.shadowS};
  border-radius: 100%;

  ${({ $isError }) =>
    $isError &&
    css`
      border-color: ${({ theme }) => theme.form.errorColor};
    `}

  /** Size styles */
  ${({ $size }) =>
    $size &&
    css`
      ${sizes[$size].checkbox}
    `}

  ${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${sizes[$sizeConfined].checkbox}
      }
    `};

  ${({ $sizeWide }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${$sizeWide && sizes[$sizeWide].checkbox}
      }
    `};

  &:hover {
    background-color: ${({ theme }) => theme.form.hoverColor};
  }
  &:focus-within {
    ${focusShadow}
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RadioGroupLabel = styled.p<SizeProps>`
  margin-bottom: ${spaceXXS};
  padding: 0;
  font-size: ${scale070};
  color: ${({ theme }) => theme.form.neutralColor};

  /** Size styles */
  ${({ $size }) =>
    $size &&
    css`
      ${sizes[$size].radioGroupLabel}
    `}

  ${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${sizes[$sizeConfined].radioGroupLabel}
      }
    `};

  ${({ $sizeWide }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${$sizeWide && sizes[$sizeWide].radioGroupLabel}
      }
    `};
`;

export const Styled = {
  Root,
  Label,
  Indicator,
  Item,
  ItemContainer,
  RadioGroupLabel,
};
