import styled from 'styled-components';

import {
  borderRadiusXS,
  scale250,
  scale320,
  scale350,
  spaceM,
  spaceS,
  spaceXL,
  spaceXS,
  spaceXXS,
} from '../../../../tokens';
import { MenuItem as MenuItemComponent } from '../../../menu';
export const AddBlockToolContainer = styled.div`
  width: auto;
`;

export const MenuItem = styled(MenuItemComponent)<{ $notFound?: boolean }>`
  width: 95%;
  padding: ${spaceXS} ${spaceXS};
  padding-right: ${spaceXL};
  margin: ${spaceXS};

  pointer-events: ${({ $notFound }) => ($notFound ? 'none' : '')};
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

export const MenuItemContainer = styled.div`
  max-height: ${scale320};
  margin-top: ${spaceS};
  overflow-y: scroll;
`;
