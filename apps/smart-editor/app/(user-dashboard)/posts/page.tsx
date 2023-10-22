import { Posts } from '@smart-editor/components/user-dashboard/posts';
import { getBaseUrl } from '@smart-editor/utils/get-base-url';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { Session, getServerSession } from 'next-auth';

import { Headline } from '@smartcoorp/ui/headline';
import { space3XL } from '@smartcoorp/ui/tokens';

const PostsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = (await getServerSession(nextAuthConfig)) as Session;

  const fetchSearchParams = new URLSearchParams({
    userId: session?.id?.toString() ?? '',
    ...(searchParams.title ? { title: searchParams.title } : {}),
  });

  const response = await fetch(
    `${getBaseUrl()}/api/posts?${fetchSearchParams.toString()}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Origin: 'admin' },
    }
  );

  const data = await response.json();
  const { posts } = data;

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
      {/* <Suspense fallback={<SkeletonPosts />}> */}
      <Posts initialPosts={posts} userId={session.id as string} />
      {/* </Suspense> */}
    </>
  );
};

export default PostsPage;
