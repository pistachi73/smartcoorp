import { getApiKeys } from '@smart-editor/actions/api-keys.actions';
import { ApiKeys } from '@smart-editor/components/user-dashboard/api-keys';
import { getQueryClient } from '@smart-editor/utils/get-query-client';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { Breadcrumb, BreadcrumbItem } from '@smartcoorp/ui/breadcrumb';
import { Headline } from '@smartcoorp/ui/headline';
import { space3XL, spaceXL } from '@smartcoorp/ui/tokens';

export const metadata: Metadata = {
  title: 'Manage API keys - Securely control your integration access',
  description:
    "Take control of your integration access with the API Keys control panel. This centralized hub empowers you to create, monitor, and secure API keys for seamless interaction with SmartEditor's API. Elevate your development experience while maintaining the highest standards of security and control.",
};

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
