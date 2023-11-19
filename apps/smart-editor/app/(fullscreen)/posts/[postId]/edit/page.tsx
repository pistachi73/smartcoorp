import { getPost } from '@smart-editor/actions/posts.actions';
import { PostWriter } from '@smart-editor/components/user-dashboard/posts';
import { getQueryClient } from '@smart-editor/utils/get-query-client';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';

type EditPostPageProps = {
  params: {
    postId: string;
  };
};

const EditPostPage = async ({ params }: EditPostPageProps) => {
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

  const data = queryClient.getQueryData(['getPost', postId]) as unknown as any;
  if (!data?.post) {
    console.log(queryClient.getQueryData(['getPost', postId]));
    redirect('/posts');
  }

  return (
    <Hydrate state={dehydratedState}>
      <PostWriter />;
    </Hydrate>
  );
};

export default EditPostPage;
