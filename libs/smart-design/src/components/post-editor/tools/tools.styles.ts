import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import {
  borderRadiusS,
  borderRadiusXS,
  primary100_RGBA,
  scale030,
  scale060,
  scale070,
  scale100,
  scale370,
  scale400,
  spaceL,
  spaceM,
  spaceS,
  spaceXXS,
} from '../../../tokens';

export const ToolsContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  gap: ${spaceXXS};
  left: -10px;
  -webkit-backface-visibility: hidden !important;
  backface-visibility: hidden !important;
`;

export const DropdownTrigger = styled(DropdownMenu.Trigger)`
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
export const DropdownContent = styled(motion(DropdownMenu.Content))`
  min-width: ${scale370};

  margin: 0;

  transform-origin: top left;

  background-color: ${({ theme }) => theme.backgroundScreen};
  border-radius: ${borderRadiusS};
  box-shadow: ${({ theme }) => theme.shadow.shadowM};
  border: 1px solid ${({ theme }) => theme.common.overBackgroundNeutral};

  [cmdk-group] {
    overflow: hidden;
    padding: 0 ${scale030};
    padding-bottom: ${spaceS};
  }

  [cmdk-group-heading] {
    padding: ${spaceS} ${spaceM};
    font-size: ${scale060};
    color: ${({ theme }) => theme.common.overBackgroundNeutral};
  }

  [cmdk-list] {
    max-height: ${scale400};
  }

  [cmdk-input-wrapper] {
    padding: ${spaceS} 12px;
    border-radius: ${borderRadiusXS};
    margin: ${spaceS};

    display: flex;
    align-items: center;
    gap: 8px;
    background-color: ${({ theme }) => theme.common.backgroundColor};
  }

  [cmdk-input] {
    width: 100%;
    border-radius: ${borderRadiusXS};
    outline: none;
    border: none;
    font-size: ${scale070};
    background-color: ${({ theme }) => theme.common.backgroundColor};
  }

  [cmdk-item] {
    width: 100%;

    border-radius: ${borderRadiusXS};

    display: flex;
    align-items: center;
    position: relative;
    outline: none;
    cursor: pointer;

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

export const Separator = styled(DropdownMenu.Separator)`
  height: 1px;
  width: calc(100%);

  margin-top: ${spaceS};

  background-color: ${({ theme }) => theme.common.overBackgroundNeutral};

  &:last-of-type {
    display: none;
  }
`;
