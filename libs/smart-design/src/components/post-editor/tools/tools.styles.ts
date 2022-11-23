import styled from 'styled-components';

import { borderRadiusXS, spaceM, spaceS } from '../../../tokens';
import { Menu as MenuComponent } from '../../menu';

export const Menu = styled(MenuComponent)`
  height: 28px;
  width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: ${({ theme }) => theme.common.backgroundColor};
    border-radius: ${borderRadiusXS};
  }
`;

export const MenuItemIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${spaceS};
  margin-right: ${spaceM};
  border: 1px solid;
  border-color: ${({ theme }) => theme.common.overBackgroundNeutral};
  border-radius: ${borderRadiusXS};
`;
