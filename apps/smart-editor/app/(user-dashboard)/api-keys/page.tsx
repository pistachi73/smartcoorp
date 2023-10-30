import { getApiKeys } from '@smart-editor/actions/api-keys.actions';
import { ApiKeys } from '@smart-editor/components/user-dashboard/api-keys';
import { getQueryClient } from '@smart-editor/utils/get-query-client';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import { Breadcrumb, BreadcrumbItem } from '@smartcoorp/ui/breadcrumb';
import { Headline } from '@smartcoorp/ui/headline';
import { space3XL, spaceXL } from '@smartcoorp/ui/tokens';

const APIKeyPage = async () => {
  const sesssion = await getServerSession(nextAuthConfig);
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchQuery({
    queryKey: ['getApiKeys'],
    queryFn: () => getApiKeys({ userId: sesssion?.id?.toString() ?? '' }),
  });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Api Keys',
      href: '/api-keys',
    },
  ];
  return (
    <>
      <Breadcrumb
        homeUrl="/posts"
        breadcrumbs={breadcrumbs}
        style={{
          marginBottom: spaceXL,
        }}
      />
      <Headline
        size="xlarge"
        style={{
          marginBottom: space3XL,
        }}
      >
        Api Keys
      </Headline>
      <Hydrate state={dehydratedState}>
        <ApiKeys userId={sesssion?.id ?? ''} />
      </Hydrate>
    </>
  );
};

export default APIKeyPage;
