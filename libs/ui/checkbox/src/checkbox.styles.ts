import * as Checkbox from '@radix-ui/react-checkbox';
import styled, { css } from 'styled-components';

import {
  borderRadiusXS,
  focusShadow,
  mediaConfined,
  mediaWide,
  primary,
  scale070,
  scale080,
  scale100,
  scale110,
  spaceM,
  spaceS,
} from '@smartcoorp/ui/tokens';

import type { CheckboxSize } from './checkbox.types';

type SizeProps = {
  $size?: CheckboxSize;
  $sizeConfined?: CheckboxSize;
  $sizeWide?: CheckboxSize;
};

export const sizes = {
  small: {
    checkbox: css`
      min-width: ${scale100};
      min-height: ${scale100};
    `,
    label: css`
      font-size: ${scale070};
      padding: ${spaceS} ${spaceM};
    `,
  },
  medium: {
    checkbox: css`
      min-width: ${scale110};
      min-height: ${scale110};
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
  width: 100%;
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.35;
      pointer-events: none;
    `}
`;
export const Root = styled(Checkbox.Root)<SizeProps>`
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

  &[data-state='checked'] {
    border-color: ${primary};
  }
`;

export const Label = styled.label<SizeProps>`
  width: 100%;
  color: ${({ theme }) => theme.color.neutral};
  cursor: pointer;
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
