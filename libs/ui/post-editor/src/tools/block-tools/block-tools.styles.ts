import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

import { DropdownMenuTrigger } from '@smartcoorp/ui/dropdown-menu';
import {
  borderRadiusXS,
  gray300,
  mediaConfined,
  scale120,
  spaceXXS,
} from '@smartcoorp/ui/tokens';

export const ToolsContainer = styled(motion.div)<{
  $top: number;
  $left: number;
  $height: number;
}>`
  position: absolute;
  z-index: 100;
  display: flex;
  left: -10px;
  -webkit-backface-visibility: hidden !important;
  backface-visibility: hidden !important;
  gap: ${spaceXXS};

  ${({ $top, $left, $height }) => css`
    top: calc(${$top}px + ${$height}px - 4px);
    left: calc(${$left}px);

    @media ${mediaConfined} {
      top: calc(${$top}px + 8px);
      left: calc(${$left}px + -64px);
    }
  `};
`;

export const DropdownTrigger = styled(DropdownMenuTrigger)`
  width: ${scale120};
  height: ${scale120};
  padding: ${spaceXXS};
  outline: none;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: ${borderRadiusXS};
  border: 1px solid ${gray300};
  background-color: white;
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.common.backgroundColor};
    cursor: pointer;
  }
`;
