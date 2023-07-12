'use client';
import React from 'react';

import { useIsMounted } from '@smartcoorp/smart-hooks';

import { ProfileInfo } from './components/profile-info';
import { SidebarLinks } from './components/sidebar-links';
import { SidebarLogo } from './components/sidebar-logo';
import { tabs } from './helpers';
import { Divider, Nav, SidebarContainer } from './sidebar.styles';

export const Sidebar = () => {
  const isMounted = useIsMounted();
  return (
    <SidebarContainer>
      {isMounted && (
        <>
          <SidebarLogo />
          <Divider />
          <Nav>
            <SidebarLinks links={tabs} />
          </Nav>
          <Divider />
          <ProfileInfo />
        </>
      )}
    </SidebarContainer>
  );
};
