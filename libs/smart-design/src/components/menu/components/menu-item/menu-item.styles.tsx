import styled, { css } from 'styled-components';

import {
  borderRadiusXS,
  primary,
  scale070,
  spaceM,
  spaceXL,
  spaceXS,
} from '../../../../tokens';

type ItemTransientProps = {
  $disabled?: boolean;
};

const MenuItemContainer = styled.li`
  display: list-item;
  list-style: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const baseItem = css`
  width: 100%;
  padding: ${spaceM} ${spaceXL};
  margin: ${spaceXS} 0;
  font-weight: 700;
  font-size: ${scale070};

  border-radius: ${borderRadiusXS};

  display: flex;
  align-items: center;
  position: relative;
`;

const stateItem = {
  enabled: css`
    color: ${({ theme }) => theme.color.neutral};

    &:hover,
    &:focus {
      background: ${({ theme }) => theme.menu.menuItem.hoverBackgroundColor};
      &:before {
        background-color: ${primary};
      }
    }
    &:focus {
      outline: 1px solid ${primary};
    }
  `,
  disabled: css`
    //pointer-events: none;
    cursor: not-allowed;
    color: ${({ theme }) => theme.common.disabledSurfaceColor};
    //background-color: ${({ theme }) => theme.common.disabledBackgroundColor};

    &:focus {
      outline: none;
    }
  `,
};

const MenuItem = styled.button<ItemTransientProps>`
  ${baseItem}
  ${({ $disabled }) => ($disabled ? stateItem.disabled : stateItem.enabled)}
`;

export const Styled = {
  MenuItemContainer,
  MenuItem,
};
