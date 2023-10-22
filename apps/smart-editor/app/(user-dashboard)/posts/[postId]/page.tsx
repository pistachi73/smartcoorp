import { PostBuilder } from '@smart-editor/components/user-dashboard/posts/post-builder';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { Session, getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';

import prisma from '@smartcoorp/prisma';

type PostPageProps = {
  params: {
    postId: string;
  };
};

const PostPage = async ({ params }: PostPageProps) => {
  const { postId } = params;
  const session = (await getServerSession(nextAuthConfig)) as Session;

  const post = await prisma.ePost.findUnique({
    where: {
      id: postId,
      userId: session?.id,
    },
  });

  if (!post) {
    redirect('/posts');
  }

  return (
    <PostBuilder
      initialPost={post}
      userId={session.id as string}
      postId={postId}
    />
  );
};

export default PostPage;
