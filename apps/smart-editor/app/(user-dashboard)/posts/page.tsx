import { getPosts } from '@smart-editor/actions/posts.actions';
import { Posts } from '@smart-editor/components/user-dashboard/posts';
import { getQueryClient } from '@smart-editor/utils/get-query-client';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import { Breadcrumb, type BreadcrumbItem } from '@smartcoorp/ui/breadcrumb';
import { Headline } from '@smartcoorp/ui/headline';
import { space3XL, spaceL } from '@smartcoorp/ui/tokens';

const PostsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | null };
}) => {
  const session = await getServerSession(nextAuthConfig);
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchQuery({
    queryKey: ['getPosts', searchParams.title ?? ''],
    queryFn: () =>
      getPosts({
        userId: session?.id?.toString() ?? '',
        title: searchParams.title,
      }),
  });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Posts',
      href: '/posts',
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
          marginBottom: space3XL,
        }}
      >
        Overview
      </Headline>
      <Hydrate state={dehydratedState}>
        <Posts userId={session?.id ?? ''} />
      </Hydrate>
    </>
  );
};

export default PostsPage;
