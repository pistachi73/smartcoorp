import { getPost } from '@smart-editor/actions/posts.actions';
import { PostBuilder } from '@smart-editor/components/user-dashboard/posts/post-builder';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { Session, getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';

import { Breadcrumb, BreadcrumbItem } from '@smartcoorp/ui/breadcrumb';
import { spaceXL } from '@smartcoorp/ui/tokens';

type PostPageProps = {
  params: {
    postId: string;
  };
};

const PostPage = async ({ params }: PostPageProps) => {
  const { postId } = params;
  const session = await getServerSession(nextAuthConfig);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['post', postId],
    queryFn: () =>
      getPost({
        userId: session?.id?.toString() ?? '',
        postId,
      }),
  });

  if (queryClient.getQueryData(['post', postId]) === undefined) {
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
          marginBottom: spaceXL,
        }}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostBuilder
          userId={(session as Session).id as string}
          postId={postId}
        />
      </HydrationBoundary>
    </>
  );
};

export default PostPage;
