import styled, { css } from 'styled-components';

import {
  motionEasingEnter,
  motionTimeM,
  primary,
  scale070,
  spaceM,
  spaceXL,
} from '../../../../tokens';

type ItemTransientProps = {
  $disabled?: boolean;
};

const MenuItem = styled.li`
  display: list-item;
  list-style: none;
  width: 100%;
`;

const baseLink = css`
  width: 100%;
  padding: ${spaceM} ${spaceXL};
  font-weight: 700;
  font-size: ${scale070};

  display: flex;
  align-items: center;
  position: relative;

  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: calc(100% + 2px);

    background-color: transparent;
    transition-duration: ${motionTimeM};
    transition-property: background-color;
    transition-timing-function: ${motionEasingEnter};
  }
`;

const stateLink = {
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
      outline: none;
      border-bottom: 1px solid ${primary};
      border-top: 1px solid ${primary};
      border-right: 1px solid ${primary};
    }
  `,
  disabled: css`
    pointer-events: none;

    color: ${({ theme }) => theme.common.disabledSurfaceColor};
    background-color: ${({ theme }) => theme.common.disabledBackgroundColor};

    &:focus {
      outline: none;
    }
  `,
};

const Link = styled.a<ItemTransientProps>`
  ${baseLink}
  ${({ $disabled }) => ($disabled ? stateLink.disabled : stateLink.enabled)}
`;

export const Styled = {
  MenuItem,
  Link,
};
