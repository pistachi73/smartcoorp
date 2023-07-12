'use client';

import styled, { css } from 'styled-components';

import Link from 'next/link';

import { DotLoading } from '@smartcoorp/ui/dot-loading';
import {
  borderRadiusXS,
  getFocusShadow,
  mediaConfined,
  mediaWide,
  motionEasingStandard,
  motionTimeXS,
  scale070,
  scale080,
  scale100,
  scale140,
  scale150,
  scale160,
  spaceS,
  spaceXXS,
} from '@smartcoorp/ui/tokens';

import { ButtonColors, ButtonSizes, ButtonVariants } from './button.types';

type ButtonTransientProps = {
  $ellipsis?: boolean;
  $iconOnly: boolean;
  $size: ButtonSizes;
  $sizeConfined?: ButtonSizes;
  $sizeWide?: ButtonSizes;
  $variant: ButtonVariants;
  $disabled?: boolean;
  $color: ButtonColors;
};

type IconContainerTransientProps = {
  $loading: boolean;
  $iconSize?: number;
  $iconAfter?: boolean;
};
type TextTransientProps = {
  $ellipsis?: boolean;
  $loading?: boolean;
};

type InnerContentTransientProps = {
  $ellipsis?: boolean;
};

const baseButton = css`
  border: none;
  border: 1px solid transparent;
  font-weight: 600;
  color: black;
  border-radius: ${borderRadiusXS};
  cursor: pointer;
  background-color: transparent;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  position: relative;
  text-decoration: none;
  vertical-align: top;

  user-select: none;
  touch-action: none;

  transition-property: transform, background-color, box-shadow, border;
  transition-duration: ${motionTimeXS};
  transition-timing-function: ${motionEasingStandard};

  &:hover,
  &:focus {
    cursor: pointer;
    text-decoration: none;
  }

  &:disabled {
    cursor: default;
  }
`;

// *** Sizes ***
export const sizes = {
  small: css`
    font-size: ${scale070};
    height: ${scale140};
    min-width: ${scale140};
    padding-left: calc(${scale140} / 2);
    padding-right: calc(${scale140} / 2);
  `,
  medium: css`
    font-size: ${scale080};
    height: ${scale150};
    min-width: ${scale150};
    padding-left: calc(${scale150} / 2);
    padding-right: calc(${scale150} / 2);
  `,
  large: css`
    font-size: ${scale100};
    height: ${scale160};
    min-width: ${scale160};
    padding-left: calc(${scale160} / 2);
    padding-right: calc(${scale160} / 2);
  `,
};

// *** Variants ***
export const variants = (color: ButtonColors) => ({
  primary: css`
    border-width: 1px;
    border-style: solid;
    border-color: transparent;

    ${({ theme }) => css`
      background-color: ${theme.button[color].buttonColor};
      &:hover {
        background-color: ${theme.button[color].hoverColor};
      }
      &:focus-visible {
        ${getFocusShadow(
          theme.button[color].buttonColor,
          theme.button[color].buttonColorRGBA
        )}
      }
      &:active {
        color: ${theme.button[color].activeTextColor};
        background-color: ${theme.button[color].activeColor};
      }
    `}
  `,

  secondary: css`
    background-color: transparent;
    border-width: 1px;
    border-style: solid;

    ${({ theme }) => css`
      border-color: ${color === 'primary'
        ? theme.color.neutral
        : theme.button[color].buttonColor};
      color: ${color === 'primary'
        ? theme.color.neutral
        : theme.button[color].buttonColor};

      &:hover {
        background-color: ${theme.button.shared.secondaryHoverColor};
      }

      &:focus-visible {
        ${getFocusShadow(
          theme.button[color].buttonColor,
          theme.button[color].buttonColorRGBA
        )}
      }
      &:active {
        color: ${theme.button.shared.secondaryHoverColor};
        background-color: ${theme.color.neutral};
        border-color: ${theme.color.neutral};
      }
    `}
  `,
  text: css`
    position: relative;
    padding: 0px ${spaceXXS};

    outline: none;

    border-width: 1px;
    border-style: solid;
    border-color: transparent;

    ${({ theme }) => css`
      color: ${color === 'primary'
        ? theme.color.neutral
        : theme.button[color].buttonColor};
      &:focus-visible {
        ${getFocusShadow(
          theme.button[color].buttonColor,
          theme.button[color].buttonColorRGBA
        )}
      }
    `}
  `,
});

export const disabled = {
  primary: css`
    background-color: ${({ theme }) => theme.common.disabledBackgroundColor};
    color: ${({ theme }) => theme.common.disabledSurfaceColor};
    cursor: not-allowed;
    pointer-events: none;
  `,
  secondary: css`
    border: 1px solid ${({ theme }) => theme.common.disabledSurfaceColor};
    color: ${({ theme }) => theme.common.disabledSurfaceColor};
    cursor: not-allowed;
    pointer-events: none;
  `,
  text: css`
    color: ${({ theme }) => theme.common.disabledSurfaceColor};
    padding: 0px !important;
    height: 100% !important;
    pointer-events: none;
  `,
};

// *** Icon ***
const IconContainer = styled.div<IconContainerTransientProps>`
  margin-right: ${({ $iconAfter }) => !$iconAfter && spaceS};
  margin-left: ${({ $iconAfter }) => $iconAfter && spaceS};
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $loading }) =>
    $loading &&
    css`
      visibility: hidden;
    `};
`;

const iconOnly = css`
  padding: 0;
  & ${IconContainer} {
    margin: 0;
  }
`;

const Button = styled.button<ButtonTransientProps>`
  ${baseButton};
  ${({ $variant, $color, $disabled }) =>
    $variant && $disabled ? disabled[$variant] : variants($color)[$variant]}
  ${({ $size }) => $size && sizes[$size]}


  ${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${sizes[$sizeConfined]}
      }
    `};

  ${({ $sizeWide }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${sizes[$sizeWide]}
      }
    `};

  ${({ $iconOnly }) => $iconOnly && iconOnly};
`;

const LinkButton = styled.a<ButtonTransientProps>`
  ${baseButton};
  ${({ $variant, $disabled, $color }) =>
    $variant && $disabled ? disabled[$variant] : variants($color)[$variant]}
  ${({ $size }) => $size && sizes[$size]}


${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${sizes[$sizeConfined]}
      }
    `};

  ${({ $sizeWide }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${sizes[$sizeWide]}
      }
    `};

  ${({ $iconOnly }) => $iconOnly && iconOnly};
`;

export const NextLink = styled(Link)<ButtonTransientProps>`
  ${baseButton};
  ${({ $variant, $disabled, $color }) =>
    $variant && $disabled ? disabled[$variant] : variants($color)[$variant]}
  ${({ $size }) => $size && sizes[$size]}


${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${sizes[$sizeConfined]}
      }
    `};

  ${({ $sizeWide }) =>
    $sizeWide &&
    css`
      @media ${mediaWide} {
        ${sizes[$sizeWide]}
      }
    `};

  ${({ $iconOnly }) => $iconOnly && iconOnly};
`;

const InnerContent = styled.div<InnerContentTransientProps>`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
`;

const LoadingContainer = styled.div`
  left: 50%;
  position: absolute !important;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const Loading = styled(DotLoading)`
  left: 50%;
  position: absolute !important;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Text = styled.span<TextTransientProps>`
  display: inline-flex;
  margin: 0;

  ${({ $loading }) =>
    $loading &&
    css`
      visibility: hidden;
    `};
`;

export const Styled = {
  Button,
  IconContainer,
  InnerContent,
  Loading,
  LoadingContainer,
  Text,
  LinkButton,
  NextLink,
};
