import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { IconType } from 'react-icons';
import styled, { css } from 'styled-components';

import { useRouter } from 'next/router';

import { useBreakpoint } from '@smartcoorp/smart-hooks';
import { Button } from '@smartcoorp/ui/button';
import { ResizablePanel } from '@smartcoorp/ui/resizable-panel';
import {
  borderRadiusXS,
  gray100,
  gray200,
  gray900,
  mediaWide,
  primary,
  primary200,
  spaceL,
  spaceM,
  spaceS,
  spaceXL,
} from '@smartcoorp/ui/tokens';

export const SidebarLinkButton = styled(Button)<{
  $isActive?: boolean;
  $isGroupLink?: boolean;
}>`
  min-width: 100%;
  padding: ${spaceS};

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  ${({ $isGroupLink, $isActive }) =>
    $isGroupLink &&
    css`
      border-radius: 0;
      padding: ${spaceS} ${spaceM};
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border: 0;
      border-left: 1px solid ${$isActive ? primary : primary200};
    `}

  &:hover {
    background-color: ${gray100};
  }

  @media (${mediaWide}) {
    padding: ${spaceM} ${spaceL};
    justify-content: start !important;
  }
`;

const SidebarLinkGroup = styled.div``;
const SidebarLinkGroupList = styled(motion.ol)`
  padding-left: ${spaceXL};
  margin: 0;
`;

const SidebarLinkGroupTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ChevronContainer = styled.div`
  margin-left: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export type SidebarLink = {
  title: string;
  icon?: IconType;
  to: string;
};

export type SidebarLinkGroup = {
  title: string;
  icon?: IconType;
  links: SidebarLink[];
};

const isLinkGroup = (
  link: SidebarLink | SidebarLinkGroup
): link is SidebarLinkGroup => {
  return (link as SidebarLinkGroup).links !== undefined;
};

export const SidebarLink: FC<SidebarLink | SidebarLinkGroup> = (props) => {
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const { isWide } = useBreakpoint();
  const router = useRouter();

  if (isLinkGroup(props)) {
    const { links, title, icon: Icon } = props;
    console.log(router.pathname);
    return (
      <>
        <SidebarLinkButton
          size="small"
          variant="text"
          icon={Icon}
          onClick={() => setIsGroupOpen(!isGroupOpen)}
        >
          <SidebarLinkGroupTitle>
            {title}
            <ChevronContainer>
              {isGroupOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
            </ChevronContainer>
          </SidebarLinkGroupTitle>
        </SidebarLinkButton>
        <ResizablePanel>
          {isGroupOpen ? (
            <SidebarLinkGroupList>
              {links.map(({ title, to, icon: Icon }) => (
                <li key={title} style={{ listStyle: 'none' }}>
                  <SidebarLinkButton
                    to={to}
                    variant="text"
                    size="small"
                    icon={Icon}
                    color="primary"
                    $isActive={router.pathname.includes(to)}
                    $isGroupLink
                  >
                    {isWide && title}
                  </SidebarLinkButton>
                </li>
              ))}
            </SidebarLinkGroupList>
          ) : null}
        </ResizablePanel>
      </>
    );
  }

  const { title, to, icon: Icon } = props;
  return (
    <li style={{ listStyle: 'none' }}>
      <SidebarLinkButton
        to={to}
        target="_self"
        variant="text"
        size="small"
        icon={Icon}
        $isActive={router.pathname === to}
      >
        {isWide && title}
      </SidebarLinkButton>
    </li>
  );
};
