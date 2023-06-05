import * as Checkbox from '@radix-ui/react-checkbox';
import styled, { css } from 'styled-components';

import { focusShadow } from '../../styles';
import { borderRadiusXS } from '../../tokens/borderRadius';
import { primary } from '../../tokens/color';
import { mediaConfined, mediaWide } from '../../tokens/media';
import { scale070, scale080, scale100, scale110 } from '../../tokens/scale';
import { spaceM } from '../../tokens/spacing';

import type { CheckboxSize } from './checkbox.types';

type SizeProps = {
  $size?: CheckboxSize;
  $sizeConfined?: CheckboxSize;
  $sizeWide?: CheckboxSize;
};

export const sizes = {
  small: {
    checkbox: css`
      width: ${scale100};
      height: ${scale100};
    `,
    label: css`
      font-size: ${scale070};
      padding: ${spaceM};
    `,
  },
  medium: {
    checkbox: css`
      width: ${scale110};
      height: ${scale110};
    `,
    label: css`
      font-size: ${scale080};
      padding: ${spaceM};
    `,
  },
};

export const Container = styled.div<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.35;
      pointer-events: none;
    `}
`;
export const Root = styled(Checkbox.Root)<SizeProps>`
  width: ${scale110};
  height: ${scale110};

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.form.neutralColor};
  box-shadow: ${({ theme }) => theme.shadow.shadowS};
  border-radius: ${borderRadiusXS};

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

export const Indicator = styled(Checkbox.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${primary};
`;

export const Styled = { Root, Indicator, Label, Container };
