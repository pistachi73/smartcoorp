import { UserDashboardLayout } from '@smart-editor/components/user-dashboard/layout/user-dashboard.layout';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';

import { Breadcrumb } from '@smartcoorp/ui/breadcrumb';
import { spaceM, spaceXL } from '@smartcoorp/ui/tokens';

const UserDashboardLayoutPage = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(nextAuthConfig);

  if (!session) {
    redirect('/login');
  }

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <UserDashboardLayout>
        <div
          style={{
            marginBottom: spaceXL,
          }}
        >
          <Breadcrumb homeUrl="/posts" />
        </div>
        {/* {JSON.stringify(session, null, 2)} */}
        {children}
      </UserDashboardLayout>
    </>
  );
};

export default UserDashboardLayoutPage;
