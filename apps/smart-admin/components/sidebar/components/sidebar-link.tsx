import { FC } from 'react';
import { IconType } from 'react-icons';
import styled, { css } from 'styled-components';

import { useRouter } from 'next/router';

import { useBreakpoint } from '@smartcoorp/smart-hooks';
import { Button } from '@smartcoorp/ui/button';
import {
  borderRadiusXS,
  gray100,
  gray200,
  gray900,
  mediaWide,
  spaceL,
  spaceM,
  spaceS,
} from '@smartcoorp/ui/tokens';

export const SidebarLinkButton = styled(Button)<{ $isActive: boolean }>`
  min-width: 100%;
  padding: ${spaceS};

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${borderRadiusXS};

  border: 1px solid transparent;
  font-weight: 400;

  ${({ $isActive }) =>
    $isActive &&
    css`
      background-color: ${gray200} !important;
      color: ${gray900} !important;
      font-weight: 600;
    `}

  &:hover {
    background-color: ${gray100};
  }

  @media (${mediaWide}) {
    padding: ${spaceM} ${spaceL};
    justify-content: start !important;
  }
`;

export type SidebarLinkProps = {
  title: string;
  icon: IconType;
  to: string;
};
export const SidebarLink: FC<SidebarLinkProps> = ({
  title,
  icon: Icon,
  to,
}) => {
  const { isWide } = useBreakpoint();
  const router = useRouter();
  const isActive = router.pathname === to;
  return (
    <li style={{ listStyle: 'none' }}>
      <SidebarLinkButton
        to={to}
        target="_self"
        variant="text"
        size="small"
        icon={Icon}
        $isActive={isActive}
      >
        {isWide && title}
      </SidebarLinkButton>
    </li>
  );
};
