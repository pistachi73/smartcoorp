import styled from 'styled-components';

import {
  gray100,
  mediaWide,
  scale190,
  scale360,
  space3XL,
} from '@smartcoorp/ui/tokens';

import { Sidebar } from '../sidebar/sidebar';

const sidebarWitdh = scale190;
const sidebarWidthWide = scale360;

export const SidebarLayoutContainer = styled.main`
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  overflow-y: hidden;
  background-color: ${gray100};
`;

const ContentContainer = styled.div`
  width: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  padding: ${space3XL};
  margin-left: ${sidebarWitdh};
  overflow-y: auto;

  @media (${mediaWide}) {
    margin-left: ${sidebarWidthWide};
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
`;

const SidebarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  position: fixed;
  width: ${sidebarWitdh};

  @media (${mediaWide}) {
    width: ${sidebarWidthWide};
  }
`;

export const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarLayoutContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <ContentContainer>
        <Content id="sidebar-content">{children}</Content>
      </ContentContainer>
    </SidebarLayoutContainer>
  );
};
