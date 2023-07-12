import { SidebarLayout } from '@smart-admin/components/layout';
import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';

import { nextAuthOptions } from '@smartcoorp/smart-api';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/login');
  }
  return <SidebarLayout>{children}</SidebarLayout>;
};

export default Layout;
