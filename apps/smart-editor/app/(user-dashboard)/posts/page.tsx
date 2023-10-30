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
  const queryClient = getQueryClient();
  const session = await getServerSession(nextAuthConfig);

  await queryClient.prefetchQuery({
    queryKey: ['getPosts'],
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
        style={{
          marginBottom: space3XL,
        }}
      >
        Overview
      </Headline>
      <Hydrate state={dehydrate(queryClient)}>
        <Posts userId={session?.id ?? ''} />
      </Hydrate>
    </>
  );
};

export default PostsPage;