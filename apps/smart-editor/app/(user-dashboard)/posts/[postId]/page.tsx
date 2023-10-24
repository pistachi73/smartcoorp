import { PostBuilder } from '@smart-editor/components/user-dashboard/posts/post-builder';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { Session, getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';

import prisma from '@smartcoorp/prisma';
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

  const post = await prisma.ePost.findUnique({
    where: {
      id: postId,
      userId: session?.id,
    },
  });

  if (!post) {
    redirect('/posts');
  }

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Posts',
      href: '/posts',
    },
    {
      label: post.id,
      href: `/posts/${post.id}`,
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
      <PostBuilder
        initialPost={post}
        userId={(session as Session).id as string}
        postId={postId}
      />
    </>
  );
};

export default PostPage;
