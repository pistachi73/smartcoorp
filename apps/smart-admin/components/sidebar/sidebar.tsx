import React from 'react';

import Image from 'next/image';

import { spaceXL } from '@smartcoorp/ui/tokens';

import { ProfileInfo } from './components/profile-info';
import { SidebarLink } from './components/sidebar-link';
import { tabs } from './helpers';
import { Divider, Nav, SidebarContainer } from './sidebar.styles';

export const Sidebar = () => {
  return (
    <SidebarContainer>
      <Image
        src="/smart-admin-logo.svg"
        alt="Smart Admin"
        width="0"
        height="0"
        sizes="100vw"
        style={{
          width: '75%',
          height: 'auto',
          margin: `${spaceXL} 0`,
          paddingInline: '16px',
        }}
      />
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
