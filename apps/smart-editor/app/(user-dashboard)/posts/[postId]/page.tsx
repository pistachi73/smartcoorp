import { PostBuilder } from '@smart-editor/components/user-dashboard/posts/post-builder';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { getServerSession } from 'next-auth';
import toast from 'react-hot-toast';

import { redirect } from 'next/navigation';

import { isNumber } from '@smartcoorp/smart-types';

type PostPageProps = {
  params: {
    postId: string;
  };
};

const PostPage = async ({ params }: PostPageProps) => {
  const { postId } = params;
  const session = await getServerSession(nextAuthConfig);

  if (!session || !session.id) {
    redirect('/login');
  }

  if (isNaN(Number(postId))) {
    redirect('/posts');
  }

  const post = await prisma?.ePost.findUnique({
    where: {
      id: parseInt(postId),
      userId: session?.id,
    },
  });

  if (!post) {
    redirect('/posts');
  }

  return <PostBuilder post={post} />;
};

export default PostPage;
