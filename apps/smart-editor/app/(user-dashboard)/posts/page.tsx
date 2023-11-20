import { getPosts } from '@smart-editor/actions/posts.actions';
import { Posts } from '@smart-editor/components/user-dashboard/posts';
import { getQueryClient } from '@smart-editor/utils/get-query-client';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { Breadcrumb, type BreadcrumbItem } from '@smartcoorp/ui/breadcrumb';
import { Headline } from '@smartcoorp/ui/headline';
import { space3XL, spaceL } from '@smartcoorp/ui/tokens';

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession(nextAuthConfig);
  return {
    title: `${session?.user.name}'s posts`,
    description:
      'Explore and manage all your written blog posts in one place. The My Blog Posts section of your user panel is where your creative journey unfolds. Easily review, edit, and organize your content as you craft compelling stories with Smarteditor.',
  };
}

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
        userId: session?.id,
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
        <Posts />
      </Hydrate>
    </>
  );
};

export default PostsPage;
