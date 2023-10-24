'use client';

import { EPost } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import { useSearchParams } from 'next/navigation';

import { getPosts } from './actions/get-posts';
import { Filters } from './filters';
import { PostCard, SkeletonPostCard } from './post-card';
import { NewPostCard } from './post-card/new-post-card';
import { PostCardGrid } from './posts.styles';

type PostsProps = {
  userId: string;
  initialPosts?: EPost[];
};

export const Posts = ({ userId, initialPosts }: PostsProps) => {
  const searchParams = useSearchParams();
  const { data, isLoading, error } = useQuery(
    ['posts', searchParams.get('title')],
    async () =>
      await getPosts({
        userId,
        title: searchParams.get('title'),
      }),
    {
      initialData: { posts: initialPosts, totalPosts: initialPosts?.length },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <Filters />
      <PostCardGrid>
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <SkeletonPostCard key={`skeletonCard${i}`} />
          ))
        ) : (
          <>
            {data.posts?.map((post: EPost) => (
              <PostCard key={post.id} {...post} />
            ))}
            <NewPostCard totalPosts={data.totalPosts} />
          </>
        )}
      </PostCardGrid>
    </>
  );
};

export const SkeletonPosts = () => {
  return (
    <>
      <PostCardGrid>
        <SkeletonPostCard />
        <SkeletonPostCard />
        <SkeletonPostCard />
      </PostCardGrid>
    </>
  );
};
