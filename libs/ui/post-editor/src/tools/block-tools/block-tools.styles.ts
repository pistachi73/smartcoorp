import { motion } from 'framer-motion';
import styled from 'styled-components';

import { DropdownMenuTrigger } from '@smartcoorp/ui/dropdown-menu';
import { borderRadiusXS, scale100, spaceXXS } from '@smartcoorp/ui/tokens';

export const ToolsContainer = styled(motion.div)`
  position: absolute;
  z-index: 100;
  display: flex;
  left: -10px;
  -webkit-backface-visibility: hidden !important;
  backface-visibility: hidden !important;
`;

export const DropdownTrigger = styled(DropdownMenuTrigger)`
  width: ${scale100};
  height: ${scale100};
  padding: ${spaceXXS};
  outline: none;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: ${borderRadiusXS};
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.common.backgroundColor};
    cursor: pointer;
  }
`;
