import { getAccount } from '@smart-editor/actions/account.actions';
import { Account } from '@smart-editor/components/user-dashboard/account';
import { getQueryClient } from '@smart-editor/utils/get-query-client';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import { Breadcrumb, type BreadcrumbItem } from '@smartcoorp/ui/breadcrumb';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceL, spaceXXL } from '@smartcoorp/ui/tokens';

const AccountPage = async () => {
  const session = await getServerSession(nextAuthConfig);
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchQuery({
    queryKey: ['getAccount'],
    queryFn: () =>
      getAccount({
        userId: session?.id?.toString() ?? '',
      }),
  });
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Account settings',
      href: '/account',
    },
  ];
  return (
    <>
      <Breadcrumb
        homeUrl="/posts"
        breadcrumbs={breadcrumbs}
        style={{
          marginBottom: spaceL,
        }}
      />
      <Headline
        size="xlarge"
        as="h1"
        style={{
          marginBottom: spaceXXL,
        }}
      >
        Account settings
      </Headline>
      <Hydrate state={dehydratedState}>
        <Account userId={session?.id as string} />
      </Hydrate>
    </>
  );
};

export default AccountPage;
