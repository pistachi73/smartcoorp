import { getPost } from '@smart-editor/actions/posts.actions';
import { PostWriter } from '@smart-editor/components/user-dashboard/posts';
import { getQueryClient } from '@smart-editor/utils/get-query-client';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';

import prisma from '@smartcoorp/prisma';

type EditPostPageProps = {
  params: {
    postId: string;
  };
};

export async function generateMetadata({
  params,
}: EditPostPageProps): Promise<Metadata> {
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
    title: `${data?.title} post edit` || 'Edit post',
    description:
      "Craft your narratives with precision on SmartEditor's intuitive editing interface. Seamlessly create and edit post content with a user-friendly design, rich text formatting. Elevate your writing experience as you bring your ideas to life, all within the dynamic and responsive SmartEditor editing interface.",
  };
}

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
      <PostWriter />
    </Hydrate>
  );
};

export default EditPostPage;
