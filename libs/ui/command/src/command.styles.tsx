import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { BiSearchAlt } from 'react-icons/bi';
import styled, { css } from 'styled-components';

import {
  borderRadiusS,
  borderRadiusXS,
  mediaConfined,
  mediaWide,
  motionEasingStandard,
  motionTimeXS,
  primary100_RGBA,
  scale050,
  scale060,
  scale070,
  scale080,
  scale090,
  scale110,
  scale120,
  scale140,
  scale150,
  scale350,
  scale400,
  spaceL,
  spaceM,
  spaceS,
  spaceXS,
  spaceXXS,
} from '@smartcoorp/ui/tokens';

import { CommandSizes } from './command.types';

type SizeProps = {
  $size: CommandSizes;
  $sizeConfined?: CommandSizes;
  $sizeWide?: CommandSizes;
};

export const sizes = {
  small: {
    item: css`
      min-height: ${scale140};
      padding: 0 ${spaceM};
      font-size: ${scale070};
    `,
    input: css`
      font-size: ${scale070};
    `,

    groupLabel: css`
      font-size: ${scale060};
      padding: ${spaceXS} ${spaceM};
    `,

    defaultCommandIconContainer: css`
      width: ${scale110};
      height: ${scale110};
    `,
  },
  medium: {
    item: css`
      min-height: ${scale150};
      padding: 0 ${spaceM};
      font-size: ${scale070};
    `,
    input: css`
      font-size: ${scale080};
    `,

    groupLabel: css`
      font-size: ${scale060};
      padding: ${spaceXS} ${spaceM};
    `,
    defaultCommandIconContainer: css`
      width: ${scale120};
      height: ${scale120};
    `,
  },
};

export const CommandContainer = styled.div<SizeProps>`
  min-width: ${scale350};

  margin: 0;

  overflow: hidden;

  background-color: ${({ theme }) => theme.backgroundScreen};
  border-radius: ${borderRadiusS};
  box-shadow: ${({ theme }) => theme.shadow.shadowM};
  border: 1px solid ${({ theme }) => theme.form.placeholderColor};

  [cmdk-group] {
    overflow: hidden;
    padding: ${spaceXS} 0;

    &:not(:last-child) {
      border-bottom: 1px solid
        ${({ theme }) => theme.form.select.groupDividerColor};
    }
  }
  [cmdk-separator] {
    margin: ${spaceXS} 0;
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.form.placeholderColor};
  }
  [cmdk-group-heading] {
    color: ${({ theme }) => theme.common.overBackgroundNeutral};

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

  [cmdk-list] {
    max-height: ${scale400};
    max-width: 600px;
  }

  [cmdk-input-wrapper] {
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid ${({ theme }) => theme.form.placeholderColor};

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

  [cmdk-input] {
    width: 100%;
    outline: none;
    border: none;

    background-color: transparent !important;

    color: ${({ theme }) => theme.color.neutral};
    &::placeholder {
      color: ${({ theme }) => theme.form.placeholderColor};
    }

    /** Size styles */
    ${({ $size }) =>
      $size &&
      css`
        ${sizes[$size].input}
      `}

    ${({ $sizeConfined }) =>
      $sizeConfined &&
      css`
        @media ${mediaConfined} {
          ${sizes[$sizeConfined].input}
        }
      `};

    ${({ $sizeWide }) =>
      $sizeWide &&
      css`
        @media ${mediaWide} {
          ${$sizeWide && sizes[$sizeWide].input}
        }
      `};
  }

  [cmdk-item] {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    margin: ${spaceXXS} 0;
    color: ${({ theme }) => theme.color.neutral};

    transition-property: background-color;
    transition-duration: ${motionTimeXS};
    transition-timing-function: ${motionEasingStandard};
    &[aria-selected] {
      background: ${({ theme }) => theme.common.backgroundColor};
      &[aria-current='true'] {
        background: rgba(${primary100_RGBA}, 1) !important;
      }
    }

    &[aria-disabled] {
      cursor: not-allowed;
      opacity: 0.35;
    }
    &[aria-current='true'] {
      background: rgba(${primary100_RGBA}, 0.75) !important;
    }

    /** Base styles */

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

    &:hover {
      background-color: ${({ theme }) => theme.form.hoverColor};
    }
  }

  [cmdk-empty] {
    padding: ${spaceL};
    font-size: ${scale070};
    color: ${({ theme }) => theme.common.overBackgroundNeutral};

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Separator = styled(DropdownMenu.Separator)`
  height: 1px;
  width: calc(100%);

  margin-top: ${spaceS};

  background-color: ${({ theme }) => theme.common.overBackgroundNeutral};

  &:last-of-type {
    display: none;
  }
`;

const SearchIcon = styled(BiSearchAlt)`
  color: ${({ theme }) => theme.form.neutralColor};
`;

/** STYLES FOR DEFAULT ITEM CONTENT */
export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const IconContainer = styled.div<SizeProps>`
  margin-right: ${spaceM};

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: ${borderRadiusXS};
  border: 1px solid ${({ theme }) => theme.form.neutralColor};
  color: ${({ theme }) => theme.color.neutral};
  background-color: ${({ theme }) => theme.color.invertedNeutral};

  /** Size styles */
  ${({ $size }) =>
    $size &&
    css`
      ${sizes[$size].defaultCommandIconContainer}
    `}

  ${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${sizes[$sizeConfined].defaultCommandIconContainer}
      }
    `};

  ${({ $sizeWide }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${$sizeWide && sizes[$sizeWide].defaultCommandIconContainer}
      }
    `};
`;

export const Label = styled.span`
  font-size: ${scale070};
`;

export const KBDContainer = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  gap: ${spaceXXS};
  cursor: pointer;
  border-radius: ${borderRadiusXS};
`;

export const KBD = styled.kbd`
  font-family: 'Inter', 'Montserrat', 'Trebuchet MS', Arial, 'Helvetica Neue',
    sans-serif;

  height: ${scale090};
  width: ${scale090};
  font-size: ${scale050};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${borderRadiusXS};
  color: ${({ theme }) => theme.command.KBDColor};
  background-color: ${({ theme }) => theme.command.KBDBacgroundColor};
`;

export const Styled = {
  CommandContainer,
  SearchIcon,
  Separator,
  ItemContainer,
  IconContainer,
  Label,
  KBDContainer,
  KBD,
};
