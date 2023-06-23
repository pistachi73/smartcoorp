import React from 'react';

import Image from 'next/image';

import { useBreakpoint } from '@smartcoorp/smart-hooks';
import { scale130 } from '@smartcoorp/ui/tokens';

import { ProfileInfo } from './components/profile-info';
import { SidebarLink } from './components/sidebar-link';
import { tabs } from './helpers';
import {
  Divider,
  LogoContainer,
  Nav,
  SidebarContainer,
} from './sidebar.styles';

export const Sidebar = () => {
  const { isWide } = useBreakpoint();
  return (
    <SidebarContainer>
      <LogoContainer>
        <Image
          src={isWide ? '/smart-admin-logo.svg' : '/logo.svg'}
          alt="Smart Admin"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: 'auto', height: scale130 }} // optional
        />
      </LogoContainer>

      <Divider />
      <Nav>
        {tabs.map((tab) => (
          <SidebarLink key={tab.title} {...tab} />
        ))}
      </Nav>
      <Divider />
      <ProfileInfo />
    </SidebarContainer>
  );
};
