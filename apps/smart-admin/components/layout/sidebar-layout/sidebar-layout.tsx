import { Sidebar } from '../../sidebar/sidebar';

import {
  Content,
  ContentContainer,
  SidebarContainer,
  SidebarLayoutContainer,
} from './sidebar-layout.styles';

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
