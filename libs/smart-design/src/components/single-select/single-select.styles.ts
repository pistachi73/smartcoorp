import * as Select from '@radix-ui/react-select';
import styled, { css, keyframes } from 'styled-components';

import {
  borderRadiusXS,
  borderRadiusXXS,
  gray100,
  gray200,
  gray300,
  gray400,
  mediaConfined,
  mediaWide,
  motionEasingEnter,
  motionEasingLeave,
  motionEasingStandard,
  motionTimeL,
  motionTimeM,
  motionTimeXS,
  primary,
  primary_RGBA,
  red400,
  red500,
  scale005,
  scale030,
  scale060,
  scale070,
  scale080,
  scale100,
  scale130,
  scale140,
  scale150,
  scale160,
  scale170,
  space6XL,
  spaceM,
  spaceS,
  spaceXS,
} from '../../tokens';

import type { SingleSelectSizes } from './single-select.types';
const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }`;
type TriggerProps = {
  $disabled?: boolean;
  $error?: boolean;
  $size: SingleSelectSizes;
  $sizeConfined?: SingleSelectSizes;
  $sizeWide?: SingleSelectSizes;
  // $isFilled: boolean;
  // $isOpen: boolean;
};

type ItemProps = {
  $size: SingleSelectSizes;
  $sizeConfined?: SingleSelectSizes;
  $sizeWide?: SingleSelectSizes;
};
type GroupProps = {
  $size: SingleSelectSizes;
  $sizeConfined?: SingleSelectSizes;
  $sizeWide?: SingleSelectSizes;
};

export const sizes = {
  small: {
    trigger: css`
      height: ${scale150};
    `,
    item: css`
      height: ${scale150};
    `,
    value: css`
      font-size: ${scale070};
      padding-left: ${scale070};
    `,
    label: css`
      font-size: ${scale070};
    `,
    placeholder: css`
      font-size: ${scale080};
    `,
    groupLabel: css`
      font-size: ${scale070};
      height: ${scale100};
    `,
  },
  medium: {
    trigger: css`
      height: ${scale150};
      padding: 0 ${spaceM};
    `,
    item: css`
      height: ${scale150};
      padding: 0 ${spaceM};
      font-size: ${scale080};
    `,
    value: css`
      font-size: ${scale080};
      padding-left: ${scale070};
    `,
    label: css`
      font-size: ${scale080};
    `,
    placeholder: css`
      font-size: ${scale070};
    `,
    groupLabel: css`
      font-size: ${scale070};
      padding: ${spaceXS} ${spaceM};
    `,
  },
  large: {
    trigger: css`
      height: ${scale170};
    `,
    item: css`
      height: ${scale170};
    `,
    value: css`
      font-size: ${scale100};
      padding-left: ${scale080};
    `,
    label: css`
      font-size: ${scale080};
    `,
    placeholder: css`
      font-size: ${scale080};
    `,
    groupLabel: css`
      font-size: ${scale070};
    `,
  },
};

export const states = {
  enabled: {
    unselected: css`
      color: ${({ theme }) => theme.singleSelect.unSelectedColor};
      border-color: ${({ theme }) => theme.singleSelect.unSelectedColor};
    `,
    selected: css`
      color: ${({ theme }) => theme.singleSelect.selectedColor};
      cursor: pointer;
    `,
  },
  disabled: {
    placeholder: css`
      color: ${({ theme }) => theme.singleSelect.disabledColor};
    `,
    trigger: css`
      border-color: ${({ theme }) => theme.singleSelect.disabledColor};
      cursor: not-allowed;
    `,
  },
  error: {
    trigger: css`
      border-color: ${({ theme }) => theme.singleSelect.errorColor};
      cursor: pointer;
    `,
    placeholder: css`
      color: ${({ theme }) => theme.singleSelect.errorColor};
      border-color: ${({ theme }) => theme.singleSelect.errorColor};
    `,
  },
};

export const SingleSelectTrigger = styled(Select.Trigger)<TriggerProps>`
  /** Base styles */
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${borderRadiusXS};
  background-color: ${({ theme }) => theme.color.invertedNeutral};
  border-width: 1px;
  border-style: solid;
  transition-property: background-color;
  transition-duration: ${motionTimeXS};
  transition-timing-function: ${motionEasingStandard};

  /** Size styles */
  ${({ $size }) =>
    $size &&
    css`
      ${sizes[$size].trigger}
      &[data-placeholder] {
        ${sizes[$size].placeholder}
      }
    `}

  ${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${sizes[$sizeConfined].trigger}
        &[data-placeholder] {
          ${sizes[$sizeConfined].placeholder}
        }
      }
    `};

  ${({ $sizeWide }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${$sizeWide && sizes[$sizeWide].trigger}
        &[data-placeholder] {
          ${sizes[$sizeWide].placeholder}
        }
      }
    `};

  /** Placeholder Styles */
  &[data-placeholder] {
    ${states.enabled.unselected}
    ${({ $disabled }) => $disabled && states.disabled.placeholder}
    ${({ $error }) => $error && states.error.placeholder}
  }
  /** States Styles */
  ${states.enabled.selected}
  ${({ $disabled }) => $disabled && states.disabled.trigger}
  ${({ $error }) => $error && states.error.trigger}


  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(${primary_RGBA}, 0.25);
    border-color: ${primary};
  }

  &:hover {
    background-color: ${gray100};
  }
`;

export const SingleSelectContent = styled(Select.Content)`
  /** Base styles */
  width: 100%;
  overflow: hidden;
  background-color: white;
  border-radius: ${borderRadiusXS};
  border-width: 1px;
  border-style: solid;

  width: var(--radix-select-trigger-width);

  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px rgba(${primary_RGBA}, 0.25);
    border-color: ${primary};
  }

  /** Animation styles */
  animation-name: ${slideUpAndFade};
  animation-duration: ${motionTimeM};
  animation-timing-function: ${motionEasingEnter};
  will-change: transform, opacity;
`;

export const SingleSelectItem = styled(Select.Item)<ItemProps>`
  /** Base styles */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spaceM};
  cursor: pointer;
  border-radius: ${borderRadiusXXS};

  /** Size styles */
  &:focus {
    outline: none;
  }

  &[data-highlighted] {
    background-color: ${gray200};
  }

  &[data-state='checked'] {
    background-color: ${({ theme }) => theme.singleSelect.selectedItemColor};
  }

  /** Size styles */
  ${({ $size }) =>
    $size &&
    css`
      ${sizes[$size].item}
      &[data-placeholder] {
        ${sizes[$size].placeholder}
      }
    `}

  ${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${sizes[$sizeConfined].trigger}
        &[data-placeholder] {
          ${sizes[$sizeConfined].placeholder}
        }
      }
    `};

  ${({ $sizeWide }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${$sizeWide && sizes[$sizeWide].trigger}
        &[data-placeholder] {
          ${sizes[$sizeWide].placeholder}
        }
      }
    `};
`;

export const SingleSlectItemGroup = styled(Select.Group)<GroupProps>`
  position: relative;
  &:not(:last-child) {
    /* styles */
    &:before {
      content: '';
      position: absolute;
      left: calc(100% - ${spaceM});
      transform: translateX(-50%);
      bottom: 0;
      height: 1px;
      width: 50%; /* or 100px */
      border-bottom: 1px solid ${gray200};
    }
  }
`;

export const SingleSelectViewport = styled(Select.Viewport)`
  padding: ${scale030};
`;

export const GroupLabel = styled(Select.Label)<GroupProps>`
  color: ${gray400};

  /** Size styles */
  ${({ $size }) =>
    $size &&
    css`
      ${sizes[$size].groupLabel}
    `}
  ${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${sizes[$sizeConfined].groupLabel}
      }
    `};

  ${({ $sizeWide }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${$sizeWide && sizes[$sizeWide].groupLabel}
      }
    `};
`;

export const HelperText = styled.span<{ $error?: boolean }>`
  //FIX: this is a temporary fix for the helper text color
  color: ${({ $error }) => ($error ? red400 : gray400)};
  font-size: ${scale060};
`;

export const SingleSelectLabel = styled.p<{ $disabled?: boolean }>`
  margin: 0;
  padding: 0;
  font-size: ${scale070};
  color: ${({ $disabled, theme }) =>
    $disabled
      ? theme.singleSelect.disabledColor
      : theme.singleSelect.unSelectedColor};
`;

export const Styled = {
  SingleSelectTrigger,
  SingleSelectContent,
  SingleSelectItem,
  SingleSlectItemGroup,
  SingleSelectViewport,
  GroupLabel,
  HelperText,
  SingleSelectLabel,
};
