import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { getServerSession } from 'next-auth';

import prisma from '@smartcoorp/prisma';
import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { space3XL } from '@smartcoorp/ui/tokens';

import { Filters } from './filters';
import { PostCard } from './post-card';
import { NewPostCard } from './post-card/new-post-card';
import { PostCardGrid } from './posts.styles';

export const Posts = async () => {
  const session = await getServerSession(nextAuthConfig);

  const user = await prisma.eUser.findUnique({
    where: {
      id: session?.id,
    },
    include: {
      EPost: true,
    },
  });

  return (
    <div>
      <Headline size="xlarge" noMargin>
        Overview
      </Headline>
      <Body
        variant="neutral"
        style={{
          marginBottom: space3XL,
        }}
      >
        Manage, Create, and Track Your Blog Posts with Ease
      </Body>
      <Filters />
      <PostCardGrid>
        {user?.EPost.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
        <NewPostCard />
      </PostCardGrid>
    </div>
  );
};
