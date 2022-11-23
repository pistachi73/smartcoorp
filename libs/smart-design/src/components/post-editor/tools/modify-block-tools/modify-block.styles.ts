import styled from 'styled-components';

import { scale130 } from '../../../../tokens/scale';
import { spaceXS } from '../../../../tokens/spacing';
import { MenuItem as MenuItemComponent } from '../../../menu';

export const MenuItem = styled(MenuItemComponent)<{ $deleteEnabled?: boolean }>`
  padding: ${spaceXS};
  width: ${scale130};
  height: ${scale130};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px;
`;

export const ToolContainer = styled.div`
  display: flex;
  gap: ${spaceXS};
`;
