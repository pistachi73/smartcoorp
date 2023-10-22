import { Posts } from '@smart-editor/components/user-dashboard/posts';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { Session, getServerSession } from 'next-auth';

import { Headline } from '@smartcoorp/ui/headline';
import { space3XL } from '@smartcoorp/ui/tokens';

const PostsPage = async () => {
  const session = (await getServerSession(nextAuthConfig)) as Session;

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
      <Posts userId={session.id as string} />
    </>
  );
};

export default PostsPage;
