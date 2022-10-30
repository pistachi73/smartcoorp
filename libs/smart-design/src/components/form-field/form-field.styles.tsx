import styled, { css } from 'styled-components';

import {
  borderRadiusS,
  mediaConfined,
  mediaWide,
  motionEasingEnter,
  motionTimeM,
  scale005,
  scale060,
  scale070,
  scale080,
  scale100,
  scale110,
  scale130,
  scale140,
  scale150,
  scale160,
  scale170,
  scale230,
  scale260,
  spaceM,
  spaceXL,
} from '../../tokens';
import { Caption } from '../caption';

import { FormFieldSize, FormFieldVariant } from './form-field.types';

type TextareaTransientProps = {
  $error?: boolean;
  $isDisabled?: boolean;
  $hasFocus: boolean;
  $isFilled: boolean;
  $size?: FormFieldSize;
  $sizeConfined?: FormFieldSize;
  $sizeWide?: FormFieldSize;
  $success?: boolean;
};

type InputTransientProps = {
  $error?: boolean;
  $hasAction?: boolean;
  $iconSize?: 18 | 24;
  $isDisabled?: boolean;
  $isFilled: boolean;
  $hasFocus: boolean;
  $isIconSet?: boolean;
  $size: FormFieldSize;
  $sizeConfined?: FormFieldSize;
  $sizeWide?: FormFieldSize;
  $success?: boolean;
  $variant?: FormFieldVariant;
};

type LabelTransientProps = {
  $hasFocus: boolean;
  $isDisabled?: boolean;
  $isFilled: boolean;
  $isIconSet?: boolean;
  $multiline?: boolean;
  $error?: boolean;
  $size: FormFieldSize;
  $sizeConfined?: FormFieldSize;
  $sizeWide?: FormFieldSize;
};

type IconTransientProps = {
  $hasFocus: boolean;
  $isDisabled?: boolean;
  $isFilled: boolean;
  $error?: boolean;
};

export const variants = {
  primary: {
    small: css`
      padding-right: ${scale070};
    `,
    medium: css`
      padding-right: ${scale070};
    `,
    large: css`
      padding-right: ${scale080};
    `,
  },
  password: {
    small: css`
      padding-right: ${scale140};
    `,
    medium: css`
      padding-right: ${scale140};
    `,
    large: css`
      padding-right: ${scale150};
    `,
  },
};

export const sizes = {
  small: {
    input: css`
      font-size: ${scale070};
      height: ${scale150};
      min-width: ${scale260};
      padding-left: ${scale070};
    `,
    label: css`
      font-size: ${scale070};
    `,
  },
  medium: {
    input: css`
      font-size: ${scale080};
      height: ${scale160};
      min-width: ${scale260};
      padding-left: ${scale070};
    `,
    label: css`
      font-size: ${scale080};
    `,
  },
  large: {
    input: css`
      font-size: ${scale100};
      height: ${scale170};
      min-width: ${scale260};
      padding-left: ${scale080};
    `,
    label: css`
      font-size: ${scale080};
    `,
  },
};

const inputHasIcon = {
  small: css`
    padding-left: ${scale130};
  `,

  medium: css`
    padding-left: ${scale140};
  `,

  large: css`
    padding-left: ${scale140};
  `,
};

const borderWidth = scale005;

/* Label styles  */
const baseLabel = (multiline?: boolean) => css`
  position: absolute;
  top: ${multiline ? spaceXL : '50%'};
  left: ${scale070};
  transform: translateY(-50%);

  cursor: text;
  color: ${({ theme }) => theme.common.overBackgroundNeutral};

  transition-property: top, left, padding, color, font-size;
  transition-timing-function: ${motionEasingEnter};
  transition-duration: ${motionTimeM};

  &::after,
  &::before {
    content: '';
    position: absolute;
    width: ${borderWidth};
    height: 80%;

    transform-origin: top;

    transform: scaleY(0) translateY(-50%);
    transition-property: transform, background-color, top, left;
    transition-timing-function: ${motionEasingEnter};
    transition-duration: 0ms;
    transition-delay: 0ms;
  }

  &::after {
    right: 0px;
    top: 50%;
  }
  &::before {
    left: 0px;
    top: 50%;
  }
`;

const disabledLabel = css`
  color: ${({ theme }) => theme.common.disabledSurfaceColor};
  pointer-events: none;
`;

const labelHasIcon = {
  small: css`
    left: calc(${scale070} + ${scale100});
  `,

  medium: css`
    left: calc(${scale070} + ${scale110});
  `,

  large: css`
    left: calc(${scale070} + ${scale110});
  `,
};
const filledLabel = css`
  font-size: ${scale060} !important;
  top: calc(${borderWidth} / 2) !important;
  left: calc(${scale070} + ${borderWidth}) !important;
  padding: 0 ${spaceM};

  background-color: ${({ theme }) => theme.backgroundScreen};
  color: ${({ theme }) => theme.common.overBackgroundNeutral};
  transition-delay: 0ms;

  &::after,
  &::before {
    background-color: ${({ theme }) => theme.common.overBackgroundNeutral};

    transform: scaleY(1) translateY(-50%);
    transition-duration: ${motionTimeM};
    transition-delay: ${motionTimeM};
  }
`;
const errorLabel = css`
  color: ${({ theme }) => theme.common.errorColor};

  &::before,
  &::after {
    background-color: ${({ theme }) => theme.common.errorColor};
  }
`;

const Label = styled.label<LabelTransientProps>`
  ${({ $multiline }) => baseLabel($multiline)}

  ${({ $size }) => $size && sizes[$size].label}
  ${({ $isIconSet, $size }) => $isIconSet && labelHasIcon[$size]}
  ${({ $hasFocus, $isFilled }) => ($hasFocus || $isFilled) && filledLabel}
  ${({ $isDisabled }) => $isDisabled && disabledLabel}
  ${({ $error }) => $error && errorLabel}


  ${({ $sizeConfined, $isIconSet }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${sizes[$sizeConfined].label}
        ${$isIconSet && labelHasIcon[$sizeConfined]}
      }
    `};

  ${({ $sizeWide, $isIconSet }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${sizes[$sizeWide].label}
        ${$isIconSet && labelHasIcon[$sizeWide]}
      }
    `};
`;

/* Input styles */
const baseInput = css`
  width: 100%;
  border: none;
  outline: none;
  border-radius: ${borderRadiusS};
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;

  color: ${({ theme }) => theme.color.neutral};
  background-color: ${({ theme }) => theme.common.backgroundColor};

  border-width: ${borderWidth};
  border-style: solid;
  border-color: transparent;

  border-bottom-width: calc(${borderWidth} * 2);
  border-bottom-color: ${({ theme }) => theme.common.overBackgroundNeutral};

  &:hover {
    border-bottom-color: ${({ theme }) => theme.color.neutral} !important;
  }
`;

const disabledInput = (isFilled?: boolean) => css`
  background-color: ${({ theme }) => theme.common.disabledBackgroundColor};
  border-color: ${({ theme }) =>
    isFilled && theme.common.disabledSurfaceColor} !important;
  border-bottom-color: ${({ theme }) => theme.common.disabledSurfaceColor};
  pointer-events: none;
`;

const filledInput = css`
  color: ${({ theme }) => theme.color.neutral};
  border-top-color: ${({ theme }) => theme.common.overBackgroundNeutral};
  border-left-color: ${({ theme }) => theme.common.overBackgroundNeutral};
  border-right-color: ${({ theme }) => theme.common.overBackgroundNeutral};
  background-color: ${({ theme }) => theme.backgroundScreen};

  transition-delay: 0ms;
`;

const errorInput = css`
  border-color: ${({ theme }) => theme.common.errorColor};
  border-bottom-color: ${({ theme }) => theme.common.errorColor};
`;

const Input = styled.input<InputTransientProps>`
  ${baseInput}

  ${({ $size }) => $size && sizes[$size].input}
  ${({ $size, $isIconSet }) => $isIconSet && inputHasIcon[$size]}
  ${({ $size, $variant }) => $variant && variants[$variant][$size]}

  ${({ $isFilled, $hasFocus }) => ($isFilled || $hasFocus) && filledInput}
  ${({ $isDisabled, $isFilled }) => $isDisabled && disabledInput($isFilled)}
  ${({ $error }) => $error && errorInput}

  ${({ $sizeConfined, $isIconSet, $variant }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${$sizeConfined && sizes[$sizeConfined].input}
        ${$variant && variants[$variant][$sizeConfined]}
        ${$isIconSet && inputHasIcon[$sizeConfined]}
      }
    `};

  ${({ $sizeWide, $isIconSet, $variant }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${$sizeWide && sizes[$sizeWide].input}
        ${$variant && variants[$variant][$sizeWide]}
        ${$isIconSet && inputHasIcon[$sizeWide]}
      }
    `};
`;

const Textarea = styled.textarea<TextareaTransientProps>`
  ${baseInput}
  overflow: hidden;
  min-height: ${scale230};
  padding-top: ${spaceM};
  line-height: 1.25;
  resize: vertical;

  ${({ $size }) => $size && sizes[$size].input}
  ${({ $isFilled, $hasFocus }) => ($isFilled || $hasFocus) && filledInput}
  ${({ $isDisabled, $isFilled }) => $isDisabled && disabledInput($isFilled)}
  ${({ $error }) => $error && errorInput}

    ${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${$sizeConfined && sizes[$sizeConfined].input}
      }
    `};

  ${({ $sizeWide }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${$sizeWide && sizes[$sizeWide].input}
      }
    `};
`;

const TextareaWrapper = styled.div`
  padding: 20px 0;
`;

/** Icon styles */
const baseIcon = css`
  color: ${({ theme }) => theme.common.overBackgroundNeutral};

  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: calc(${spaceM});
  transform: translateY(-50%);
`;

const disabledIcon = css`
  color: ${({ theme }) => theme.common.disabledSurfaceColor};
`;

const errorIcon = css`
  color: ${({ theme }) => theme.common.errorColor};
`;
const IconWrapper = styled.div<IconTransientProps>`
  ${baseIcon}

  ${({ $isDisabled }) => $isDisabled && disabledIcon}
  ${({ $error }) => $error && errorIcon}
`;

const FormFieldContainer = styled.div`
  position: relative;
  width: 100%;
`;

const PasswordWrapper = styled.button`
  color: ${({ theme }) => theme.common.overBackgroundNeutral};

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: ${spaceM};
  top: 50%;
  transform: translateY(-50%);

  cursor: pointer;

  &:focus {
    color: ${({ theme }) => theme.color.neutral};
    outline: none;
  }
`;

const ErrorMessageWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0px;
`;

const ErrorCaption = styled(Caption)`
  color: ${({ theme }) => theme.common.errorColor};
`;

export const Styled = {
  FormFieldContainer,
  Input,
  Label,
  Textarea,
  TextareaWrapper,
  IconWrapper,
  ErrorMessageWrapper,
  ErrorCaption,
  PasswordWrapper,
};
