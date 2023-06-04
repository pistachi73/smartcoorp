import styled, { css } from 'styled-components';

import { focusShadow } from '../../styles';
import {
  borderRadiusXS,
  mediaConfined,
  mediaWide,
  motionEasingStandard,
  motionTimeXS,
  scale050,
  scale060,
  scale070,
  scale080,
  scale140,
  scale150,
  scale230,
  spaceM,
  spaceS,
  spaceXXS,
} from '../../tokens';

import { DatePickerSize } from './date-picker.types';

interface SizeProps {
  $size: DatePickerSize;
  $sizeConfined?: DatePickerSize;
  $sizeWide?: DatePickerSize;
}

type WithError = {
  $error?: boolean;
};

export const sizes = {
  small: {
    container: css`
      min-height: ${scale140};
    `,

    label: css`
      font-size: ${scale060};
    `,
    placeholder: css`
      font-size: ${scale070};
    `,

    helperText: css`
      font-size: ${scale050};
    `,
    indicator: css`
      padding: ${spaceS};
    `,
  },
  medium: {
    container: css`
      min-height: ${scale150};
    `,
    input: css`
      font-size: ${scale080};
      padding: ${spaceXXS} ${spaceM};
    `,

    textArea: css`
      padding: ${spaceM};
      font-size: ${scale080};
      min-height: ${scale230};
    `,
    placeholder: css`
      font-size: ${scale080};
    `,

    label: css`
      font-size: ${scale070};
    `,

    helperText: css`
      font-size: ${scale060};
    `,
    indicator: css`
      padding: ${scale050};
    `,
  },
};

export const Container = styled.button<{ $disabled?: boolean }>`
  position: relative;
  width: 100%;
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.35;
      pointer-events: none;
    `}
`;
export const InputContainer = styled.div<SizeProps & WithError>`
  width: 100%;

  border-radius: ${borderRadiusXS};
  background-color: ${({ theme }) => theme.color.invertedNeutral};
  display: flex;
  align-items: center;

  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme }) => theme.form.placeholderColor};

  transition-property: background-color;
  transition-duration: ${motionTimeXS};
  transition-timing-function: ${motionEasingStandard};

  color: ${({ theme }) => theme.color.neutral};

  /** Size styles */
  ${({ $size }) =>
    $size &&
    css`
      ${sizes[$size].container}
    `}

  ${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${sizes[$sizeConfined].container}
      }
    `};

  ${({ $sizeWide }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${$sizeWide && sizes[$sizeWide].container}
      }
    `};
  ${({ $error, theme }) =>
    $error &&
    css`
      border-color: ${theme.form.errorColor};
    `}

  &:focus-within {
    ${focusShadow}
  }

  &:hover {
    background-color: ${({ theme }) => theme.form.hoverColor};
    border-color: ${({ theme }) => theme.form.neutralColor};
  }
`;

const Placeholder = styled.span<SizeProps>`
  color: ${({ theme }) => theme.form.placeholderColor};
  &:focus {
    outline: none;
  }
  /** Size styles */
  ${({ $size }) =>
    $size &&
    css`
      ${sizes[$size].placeholder}
    `}

  ${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${sizes[$sizeConfined].placeholder}
      }
    `};

  ${({ $sizeWide }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${$sizeWide && sizes[$sizeWide].placeholder}
      }
    `};
`;

const HelperText = styled.span<SizeProps & WithError>`
  color: ${({ $error, theme }) =>
    $error ? theme.form.errorColor : theme.form.neutralColor};
  /** Size styles */
  ${({ $size }) =>
    $size &&
    css`
      ${sizes[$size].helperText}
    `}
  ${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${sizes[$sizeConfined].helperText}
      }
    `};

  ${({ $sizeWide }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${$sizeWide && sizes[$sizeWide].helperText}
      }
    `};
`;

const Label = styled.label<SizeProps>`
  margin-bottom: ${spaceXXS};
  padding: 0;
  font-size: ${scale070};
  color: ${({ theme }) => theme.form.neutralColor};
  /* font-weight: 500; */

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

const IconContainer = styled.button<SizeProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.form.neutralColor};

  /** Size styles */
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
`;

export const Styled = {
  Container,
  InputContainer,
  IconContainer,
  Label,
  HelperText,
  Placeholder,
};
