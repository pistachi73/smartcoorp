import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { getServerSession } from 'next-auth';

import prisma from '@smartcoorp/prisma';

import { Filters } from './filters';
import { PostCard, SkeletonPostCard } from './post-card';
import { NewPostCard } from './post-card/new-post-card';
import { NoPostsFoundCard } from './post-card/no-posts-found-card';
import { PostCardGrid } from './posts.styles';

type PostsProps = {
  titleSearchParam?: string;
};

export const Posts = async ({ titleSearchParam = '' }: PostsProps) => {
  console.log('Rerendering Posts');
  const session = await getServerSession(nextAuthConfig);

  const user = await prisma.eUser.findUnique({
    where: {
      id: session?.id,
    },
    include: {
      EPost: {
        where: {
          title: {
            contains: titleSearchParam,
          },
        },
      },
    },
  });

  return (
    <>
      <Filters />
      <PostCardGrid>
        {user?.EPost.length ? (
          user.EPost.map((post) => <PostCard key={post.id} {...post} />)
        ) : (
          <NoPostsFoundCard />
        )}
        <NewPostCard totalPosts={user?.EPost.length} />
      </PostCardGrid>
    </>
  );
};

export const SkeletonPosts = () => {
  return (
    <>
      <Filters />
      <PostCardGrid>
        <SkeletonPostCard />
        <SkeletonPostCard />
        <SkeletonPostCard />
      </PostCardGrid>
    </>
  );
};
