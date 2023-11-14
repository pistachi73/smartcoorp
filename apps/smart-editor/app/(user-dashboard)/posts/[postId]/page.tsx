import { getPost } from '@smart-editor/actions/posts.actions';
import { PostSettings } from '@smart-editor/components/user-dashboard/posts/post-settings/post-settings';
import { getQueryClient } from '@smart-editor/utils/get-query-client';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';

import prisma from '@smartcoorp/prisma';
import { Breadcrumb, BreadcrumbItem } from '@smartcoorp/ui/breadcrumb';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceL, spaceXXL } from '@smartcoorp/ui/tokens';
type PostSettingsPageProps = {
  params: {
    postId: string;
  };
};

export async function generateMetadata({
  params,
}: PostSettingsPageProps): Promise<Metadata> {
  // read route params
  const session = await getServerSession(nextAuthConfig);
  const { postId } = params;

  const data = await prisma.ePost.findUnique({
    where: {
      id: postId,
      userId: session?.id,
    },
    select: {
      title: true,
    },
  });

  return {
    title: data?.title || 'Post settings',
    description: 'Edit your post settings',
  };
}

const PostSettingsPage = async ({ params }: PostSettingsPageProps) => {
  const { postId } = params;
  const session = await getServerSession(nextAuthConfig);
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchQuery({
    queryKey: ['getPost', postId],
    queryFn: () =>
      getPost({
        userId: session?.id as string,
        postId,
      }),
  });

  if (queryClient.getQueryData(['getPost', postId]) === undefined) {
    redirect('/posts');
  }

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Posts',
      href: '/posts',
    },
    {
      label: postId,
      href: `/posts/${postId}`,
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
        Post settings
      </Headline>
      <Hydrate state={dehydratedState}>
        <PostSettings />
      </Hydrate>
    </>
  );
};

export default PostSettingsPage;
