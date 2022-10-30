import { motion } from 'framer-motion';
import styled, { css, keyframes } from 'styled-components';

import {
  borderRadiusS,
  mediaConfined,
  mediaWide,
  motionEasingEnter,
  motionEasingStandard,
  motionTimeL,
  motionTimeM,
  primary,
  scale005,
  scale060,
  scale070,
  scale080,
  scale100,
  scale150,
  scale160,
  scale170,
  spaceM,
} from '../../tokens';
import { Caption } from '../caption';

import { SelectSizes } from './select.types';

type LabelTransientProps = {
  $isDisabled?: boolean;
  $error?: boolean;
  $size: SelectSizes;
  $sizeConfined?: SelectSizes;
  $sizeWide?: SelectSizes;
  $isFilled: boolean;
  $isOpen: boolean;
};

type SelectContainerTransientProps = {
  $isDisabled?: boolean;
  $isFilled: boolean;
  $isOpen: boolean;
  $error?: boolean;
};

type SelectOptionsContainerTransientProps = {
  $isOpen?: boolean;
};

type SelectOptionsWrapperTransientProps = {
  $error?: boolean;
  $isOpen?: boolean;
};

const borderWidth = scale005;

export const sizes = {
  small: {
    value: css`
      font-size: ${scale070};
      height: ${scale150};
      padding-left: ${scale070};
    `,
    label: css`
      font-size: ${scale070};
    `,
  },
  medium: {
    value: css`
      font-size: ${scale080};
      height: ${scale160};
      padding-left: ${scale070};
    `,
    label: css`
      font-size: ${scale080};
    `,
  },
  large: {
    value: css`
      font-size: ${scale100};
      height: ${scale170};
      padding-left: ${scale080};
    `,
    label: css`
      font-size: ${scale080};
    `,
  },
};

/***********  LABEL  ***********/
const baseLabel = css`
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: ${scale070};
  transform: translateY(-50%);
  cursor: pointer;
  color: ${({ theme }) => theme.common.overBackgroundNeutral};

  transition-property: top, left, padding, font-size;
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
    transition-property: transform, top, left;
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
  &::before,
  &::after {
    background-color: ${({ theme }) => theme.common.disabledSurfaceColor};
  }
`;

const openLabel = css`
  color: ${primary} !important;

  &::after,
  &::before {
    background-color: ${primary} !important;
  }
`;

const errorLabel = css`
  color: ${({ theme }) => theme.common.errorColor};

  &::before,
  &::after {
    background-color: ${({ theme }) => theme.common.errorColor};
  }
`;

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

const Label = styled.label<LabelTransientProps>`
  ${baseLabel}
  ${({ $size }) => $size && sizes[$size].label}
  ${({ $isFilled, $isOpen }) => ($isFilled || $isOpen) && filledLabel}
  ${({ $isDisabled }) => $isDisabled && disabledLabel}
  ${({ $isOpen }) => $isOpen && openLabel}
  ${({ $error }) => $error && errorLabel}


  ${({ $sizeConfined }) =>
    $sizeConfined &&
    css`
      @media ${mediaConfined} {
        ${$sizeConfined && sizes[$sizeConfined].label}
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

/***********  SELECT CONTAINER  ***********/
const baseSelectContainer = css`
  position: relative;
  z-index: 101;
  white-space: nowrap;
  width: 100%;
  max-width: 100%;
  border: none;
  outline: none;
  border-top-left-radius: ${borderRadiusS};
  border-top-right-radius: ${borderRadiusS};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.common.backgroundColor};
  color: transparent;

  border-width: ${borderWidth};
  border-style: solid;
  border-color: transparent;

  border-bottom-width: calc(${borderWidth} * 2);
  border-bottom-color: ${({ theme }) => theme.common.overBackgroundNeutral};

  &:hover,
  &:focus-within {
    border-bottom-color: ${({ theme }) => theme.color.neutral} !important;
  }
`;

const disabledSelectContainer = (isFilled: boolean) => css`
  background-color: ${({ theme }) => theme.common.disabledBackgroundColor};
  border-color: ${({ theme }) =>
    isFilled && theme.common.disabledSurfaceColor} !important;
  border-bottom-color: ${({ theme }) => theme.common.disabledSurfaceColor};
  pointer-events: none;
`;

const openSelectContainer = css`
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-color: ${primary} !important;
  border-bottom-color: ${({ theme }) =>
    theme.common.backgroundColor} !important;
  background-color: ${({ theme }) => theme.backgroundScreen};
`;

const filledSelectContainer = css`
  color: ${({ theme }) => theme.color.neutral};
  border-top-color: ${({ theme }) => theme.common.overBackgroundNeutral};
  border-left-color: ${({ theme }) => theme.common.overBackgroundNeutral};
  border-right-color: ${({ theme }) => theme.common.overBackgroundNeutral};
  background-color: ${({ theme }) => theme.backgroundScreen};

  transition-delay: 0ms;
`;

const errorSelectContainer = css`
  border-color: ${({ theme }) => theme.common.errorColor};
  border-bottom-color: ${({ theme }) => theme.common.errorColor};
`;

const SelectContainer = styled.div<SelectContainerTransientProps>`
  ${baseSelectContainer}

  ${({ $isOpen }) => $isOpen && openSelectContainer}
  ${({ $isFilled }) => $isFilled && filledSelectContainer}
  ${({ $isDisabled, $isFilled }) =>
    $isDisabled && disabledSelectContainer($isFilled)}
  ${({ $error }) => $error && errorSelectContainer}
`;

/***********  SELECT CONTAINER ICONS  ***********/
const SelectIconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.common.overBackgroundNeutral};
`;

const SelectIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 ${spaceM};

  color: ${({ theme }) => theme.common.overBackgroundNeutral};

  &:focus,
  &:hover {
    color: ${({ theme }) => theme.color.neutral};
    outline: none;
  }
`;

/***********  SELECT OPTIONS CONTAINER RELATIVE CONTAINER ***********/
const RelativeContainer = styled.div`
  position: relative;
`;

/***********  SELECT OPTIONS CONTAINER ***********/

const openOptionsContainer = css`
  transition-property: padding;
  transition-duration: ${motionTimeM};
  transition-timing-function: ${motionEasingStandard};

  box-shadow: ${({ theme }) => theme.shadow.shadowM};
  background-color: ${({ theme }) => theme.backgroundScreen};
  border-bottom-left-radius: ${borderRadiusS};
  border-bottom-right-radius: ${borderRadiusS};
  border-width: ${borderWidth};
  border-style: solid;
  border-top: none;
  border-color: ${primary};
`;

const OptionsContainer = styled.div<SelectOptionsWrapperTransientProps>`
  overflow: hidden;
  width: 100%;

  position: absolute;
  left: 0;
  top: calc(100%);
  z-index: 102;

  border-color: ${({ $error, theme }) =>
    $error ? theme.common.errorColor : theme.common.overBackgroundNeutral};

  ${({ $isOpen }) => $isOpen && openOptionsContainer}
`;

/***********  SELECT OPTIONS WRAPPER ***********/
const hideScroll = keyframes`
 from, to { overflow:hidden; } 
`;

const baseOptionsWrapper = css`
  margin: 0;
  padding: 0;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const openOptionsWrapper = css`
  padding: ${spaceM} 0;

  overflow-y: auto;
  overflow-x: hidden;
  animation-duration: ${motionTimeL};
  animation-name: ${hideScroll};
  animation-fill-mode: backwards;
`;

const OptionsWrapper = styled(motion.ul)<SelectOptionsContainerTransientProps>`
  ${baseOptionsWrapper}
  ${({ $isOpen }) => $isOpen && openOptionsWrapper}
`;

/***********  SELECT ERROR ***********/
const SelectErrorCaption = styled(Caption)`
  color: ${({ theme }) => theme.common.errorColor};
`;

export const Styled = {
  Label,
  SelectContainer,
  SelectIconsContainer,
  SelectIcon,
  OptionsContainer,
  RelativeContainer,
  OptionsWrapper,
  SelectErrorCaption,
};
