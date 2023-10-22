import { Posts } from '@smart-editor/components/user-dashboard/posts';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { Session, getServerSession } from 'next-auth';

import prisma from '@smartcoorp/prisma';
import { Headline } from '@smartcoorp/ui/headline';
import { space3XL } from '@smartcoorp/ui/tokens';
const PostsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = (await getServerSession(nextAuthConfig)) as Session;

  const posts = await prisma.ePost.findMany({
    where: {
      userId: session?.id?.toString() ?? '',
      ...(searchParams.title ? { title: searchParams.title } : {}),
    },
  });

  return (
    <>
      <Headline
        size="xlarge"
        style={{
          marginBottom: space3XL,
        }}
      >
        Overview
      </Headline>
      <Posts initialPosts={posts} userId={session.id as string} />
    </>
  );
};

export default PostsPage;
