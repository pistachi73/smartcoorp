import { UserDashboardLayout } from '@smart-editor/components/user-dashboard/layout/user-dashboard.layout';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';

import { Breadcrumb } from '@smartcoorp/ui/breadcrumb';
import { spaceL } from '@smartcoorp/ui/tokens';

const UserDashboardLayoutPage = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(nextAuthConfig);

  if (!session || !session.id) {
    redirect('/login');
  }

  return (
    <>
      <UserDashboardLayout>
        <div
          style={{
            marginBottom: spaceL,
          }}
        >
          <Breadcrumb homeUrl="/posts" />
        </div>
        {children}
      </UserDashboardLayout>
    </>
  );
};

export default UserDashboardLayoutPage;
