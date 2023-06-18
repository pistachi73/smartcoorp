import { FC } from 'react';
import { IconType } from 'react-icons';
import styled, { css } from 'styled-components';

import { useRouter } from 'next/router';

import { Button } from '@smartcoorp/ui/button';
import {
  borderRadiusXS,
  gray100,
  primary100,
  primary400,
  spaceL,
  spaceM,
} from '@smartcoorp/ui/tokens';

export const SidebarLinkButton = styled(Button)<{ $isActive: boolean }>`
  min-width: 100%;
  padding: ${spaceM} ${spaceL};
  width: 100%;
  display: flex;
  justify-content: start !important;
  border-radius: ${borderRadiusXS};

  border: 1px solid transparent;
  font-weight: 400;

  ${({ $isActive }) =>
    $isActive &&
    css`
      background-color: ${primary100} !important;
      color: ${primary400} !important;
      font-weight: 600;
    `}

  &:hover {
    background-color: ${gray100};
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
        {title}
      </SidebarLinkButton>
    </li>
  );
};
