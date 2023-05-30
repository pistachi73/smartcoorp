import ReactSelect from 'react-select';
import styled, { css } from 'styled-components';

import {
  borderRadiusXS,
  gray400,
  mediaConfined,
  mediaWide,
  motionEasingEnter,
  motionEasingStandard,
  motionTimeM,
  motionTimeXS,
  primary,
  primary_RGBA,
  scale050,
  scale060,
  scale070,
  scale080,
  scale140,
  scale150,
  slideUpAndFadeIn,
  spaceM,
  spaceS,
  spaceXS,
  spaceXXS,
} from '../../tokens';

import type { SelectSizes } from './select.types';

type SelectProps = {
  $error?: boolean;
  $size: SelectSizes;
  $sizeConfined?: SelectSizes;
  $sizeWide?: SelectSizes;
};
type HelperTextProps = {
  $size: SelectSizes;
  $sizeConfined?: SelectSizes;
  $sizeWide?: SelectSizes;
  $error?: boolean;
};

type SelectLabelProps = {
  $size: SelectSizes;
  $sizeConfined?: SelectSizes;
  $sizeWide?: SelectSizes;
};

export const sizes = {
  small: {
    trigger: css`
      min-height: ${scale140};
      font-size: ${scale070};
      padding: 0 ${spaceS};
    `,
    container: css`
      padding: ${spaceXXS} ${spaceS};
      min-height: calc(${scale140} - ${spaceXS});
      font-size: ${scale070};
    `,
    input: css`
      padding: 0 ${spaceS};
      font-size: ${scale070};
    `,
    indicator: css`
      padding: ${spaceS};
    `,
    item: css`
      height: ${scale140};
      padding: 0 ${spaceM};
      font-size: ${scale070};
    `,
    label: css`
      font-size: ${scale060};
    `,
    placeholder: css`
      font-size: ${scale060};
    `,
    groupLabel: css`
      font-size: ${scale060};
      padding: ${spaceXXS} ${spaceM};
    `,
    helperText: css`
      font-size: ${scale050};
    `,
  },
  medium: {
    trigger: css`
      min-height: ${scale150};
      font-size: ${scale080};
      padding: 0 ${spaceM};
    `,
    indicator: css`
      padding: ${scale050};
    `,
    container: css`
      padding: ${spaceXXS} ${spaceM};
      min-height: ${scale150};
      font-size: ${scale080};
    `,
    input: css`
      padding: 0 ${spaceM};
      font-size: ${scale080};
    `,
    item: css`
      height: ${scale150};
      padding: 0 ${spaceM};
      font-size: ${scale080};
    `,

    label: css`
      font-size: ${scale070};
    `,
    placeholder: css`
      font-size: ${scale070};
    `,
    groupLabel: css`
      font-size: ${scale060};
      padding: ${spaceXXS} ${spaceM};
    `,
    helperText: css`
      font-size: ${scale060};
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
    unselected: css`
      color: ${({ theme }) => theme.singleSelect.disabledColor};
      border-color: ${({ theme }) => theme.singleSelect.disabledColor};
      cursor: not-allowed;
      background-color: inherit !important;
    `,
    selected: css`
      border-color: ${({ theme }) => theme.singleSelect.disabledColor};
      cursor: not-allowed;
    `,
  },
  error: {
    selected: css`
      border-color: ${({ theme }) => theme.singleSelect.errorColor};
      cursor: pointer;
    `,
    unselected: css`
      color: ${({ theme }) => theme.singleSelect.errorColor};
      border-color: ${({ theme }) => theme.singleSelect.errorColor};
    `,
  },
};

const HelperText = styled.span<HelperTextProps>`
  //FIX: this is a temporary fix for the helper text color

  color: ${({ $error, theme }) =>
    $error
      ? theme.singleSelect.errorColor
      : theme.singleSelect.unSelectedColor};
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

const SingleSelectLabel = styled.p<SelectLabelProps>`
  margin-bottom: ${spaceXS};
  padding: 0;
  font-size: ${scale070};
  color: ${({ theme }) => theme.singleSelect.unSelectedColor};

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

const SelectContainer = styled.div<{ $disabled: boolean }>`
  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.35;
    `}
`;

const StyledReactSelect = styled(ReactSelect)<SelectProps>`
  .react-select__control {
    /** Base styles */
    position: relative;
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    border-radius: ${borderRadiusXS};
    background-color: ${({ theme }) => theme.backgroundScreen};
    border-width: 1px;
    border-style: solid;

    transition-property: background-color;
    transition-duration: ${motionTimeXS};
    transition-timing-function: ${motionEasingStandard};

    cursor: pointer;
    /** Size styles */
    &:hover {
      background-color: ${({ theme }) => theme.singleSelect.triggerHoverColor};
    }

    border-color: ${({ theme }) => theme.singleSelect.unSelectedColor};

    ${({ $error }) =>
      $error &&
      css`
        border-color: ${({ theme }) =>
          theme.singleSelect.errorColor} !important;
      `}
  }

  .react-select__control--is-focused {
    outline: none;
    box-shadow: 0 0 0 3px rgba(${primary_RGBA}, 0.25);
    border-color: ${primary} !important;
  }

  .react-select__control--menu-is-open {
    box-shadow: none;
    border-color: ${({ theme }) =>
      theme.singleSelect.unSelectedColor} !important;
  }

  .react-select__value-container {
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

    ${states.enabled.unselected}
    ${({ $error }) => $error && states.error.unselected}
  }
  .react-select__value-container--has-value {
    ${states.enabled.selected}
    ${({ $error }) => $error && states.error.selected}
  }

  .react-select__input {
    color: ${({ theme }) => theme.singleSelect.selectedColor} !important;
  }

  .react-select__indicators {
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-shrink: 0;
  }

  .react-select__indicator-separator {
    margin: ${spaceS} 0;
    width: 1px;
    align-self: stretch;
    background-color: ${({ theme }) => theme.singleSelect.unSelectedColor};
  }

  .react-select__indicator {
    display: flex;
    transition: color 150ms;
    color: ${({ theme }) => theme.singleSelect.unSelectedColor};
    cursor: pointer;

    svg {
      width: 16px;
      height: 16px;
    }

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
          ${sizes[$sizeWide].indicator}
        }
      `};

    &:hover {
      color: ${({ theme }) => theme.color.neutral};
    }
  }

  .react-select__menu {
    /** Base styles */
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 8px;
    margin-top: 8px;
    top: 100%;
    position: absolute;
    width: 100%;
    z-index: 1;
    overflow: hidden;
    background-color: ${({ theme }) => theme.backgroundScreen};
    border-radius: ${borderRadiusXS};
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.singleSelect.triggerHoverColor};

    outline: none;
    box-shadow: 0 0 0 3px rgba(${primary_RGBA}, 0.25);
    border-color: ${primary} !important;

    &:focus-within {
      outline: none;
      box-shadow: 0 0 0 3px rgba(${primary_RGBA}, 0.25);
      border-color: ${primary};
    }

    /** Animation styles */
    animation-duration: ${motionTimeM};
    animation-timing-function: ${motionEasingEnter};
    will-change: transform, opacity;
    animation-name: ${slideUpAndFadeIn};
  }

  .react-select__menu-list {
  }
  .react-select__option {
    /** Base styles */
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: ${spaceXXS} 0;
    color: ${({ theme }) => theme.color.neutral};

    /** Size styles */

    /** Size styles */
    ${({ $size }) =>
      $size &&
      css`
        ${sizes[$size].item}
      `}

    ${({ $sizeConfined }) =>
      $sizeConfined &&
      css`
        @media ${mediaConfined} {
          ${sizes[$sizeConfined].item}
        }
      `};

    ${({ $sizeWide }) =>
      $sizeWide &&
      css`
        @media ${mediaWide} {
          ${$sizeWide && sizes[$sizeWide].item}
        }
      `};
  }

  .react-select__option--is-focused {
    outline: none;

    background-color: ${({ theme }) => theme.common.backgroundColor};
  }

  .react-select__option--is-selected {
    background-color: ${({ theme }) => theme.singleSelect.selectedItemColor};
  }
  .react-select__group {
    padding: ${spaceS} 0;
    padding-bottom: 0;
    border-top: 1px solid ${({ theme }) => theme.singleSelect.groupDividerColor};
    &:not(:last-child) {
      border-bottom: 1px solid
        ${({ theme }) => theme.singleSelect.groupDividerColor};
    }
  }
  .react-select__group-heading {
    cursor: default;
    display: block;
    text-transform: uppercase;

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
  }

  .react-select__menu-notice--no-options {
    padding: ${spaceM} 0;
    color: ${({ theme }) => theme.singleSelect.unSelectedColor};
  }

  .react-select__multi-value {
    display: flex;
    min-width: 0;
    background-color: hsl(0, 0%, 90%);
    background-color: ${({ theme }) =>
      theme.multipleSelect.selectedValueBackgroundColor};
    border-radius: 2px;
    margin: 2px;
    box-sizing: border-box;
  }
  .react-select__multi-value__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 2px;
    color: ${({ theme }) => theme.multipleSelect.selectedValueTextColor};
    font-size: 75%;
    padding: 3px;
    padding-left: 6px;
    box-sizing: border-box;
  }
  .react-select__multi-value__remove {
    align-items: center;
    display: flex;
    border-radius: 2px;
    padding-left: 4px;
    padding-right: 4px;
    box-sizing: border-box;

    color: ${({ theme }) => theme.multipleSelect.selectedValueTextColor};

    transition-property: background-color;
    transition-duration: ${motionTimeXS};
    transition-timing-function: ${motionEasingStandard};
    &:hover {
      background-color: ${({ theme }) =>
        theme.multipleSelect.deleteValueHoverBackgroundColor};
    }
  }
`;

export const Styled = {
  SelectContainer,
  HelperText,
  SingleSelectLabel,
  StyledReactSelect,
};
