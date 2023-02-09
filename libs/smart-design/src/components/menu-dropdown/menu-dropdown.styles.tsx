import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import { borderRadiusS, borderRadiusXS } from '../../tokens/borderRadius';
import { scale070, scale330, scale400 } from '../../tokens/scale';
import { spaceM, spaceS, spaceXL, spaceXS } from '../../tokens/spacing';

export const Content = styled(motion(DropdownMenu.Content))`
  min-width: ${scale330};
  max-height: ${scale400};
  margin: 0;
  padding: ${spaceXS} ${spaceXS};

  transform-origin: top left;

  background-color: ${({ theme }) => theme.backgroundScreen};
  border-radius: ${borderRadiusS};
  box-shadow: ${({ theme }) => theme.shadow.shadowM};
  border: 1px solid ${({ theme }) => theme.common.overBackgroundNeutral};

  overflow: hidden;
  overflow-y: scroll;
`;
export const Item = styled(DropdownMenu.Item)`
  width: 100%;
  padding: ${spaceS} ${spaceXL};
  font-weight: 700;
  font-size: ${scale070};

  border-radius: ${borderRadiusXS};

  display: flex;
  align-items: center;
  position: relative;
  outline: none;

  &[data-highlighted] {
    background: ${({ theme }) => theme.menu.menuItem.hoverBackgroundColor};
  }
`;
