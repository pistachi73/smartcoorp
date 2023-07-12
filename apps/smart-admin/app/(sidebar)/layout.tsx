import { SidebarLayout } from '@smart-admin/components/layout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <SidebarLayout>{children}</SidebarLayout>;
};

export default Layout;
