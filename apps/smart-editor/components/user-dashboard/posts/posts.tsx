'use client';

import { EPost } from '@prisma/client';
import { getPosts } from '@smart-editor/actions/posts.actions';
import { InternalServerError } from '@smart-editor/components/error-pages/internal-server-error';
import { useQuery } from '@tanstack/react-query';

import { useSearchParams } from 'next/navigation';

import { Filters } from './filters';
import { PostCard, SkeletonPostCard } from './post-card';
import { NewPostCard } from './post-card/new-post-card';
import { PostCardGrid } from './posts.styles';

type PostsProps = {
  userId: string;
};

export const Posts = ({ userId }: PostsProps) => {
  const searchParams = useSearchParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['getPosts', searchParams.get('title') ?? ''],
    queryFn: () =>
      getPosts({
        userId,
        title: searchParams.get('title') ?? '',
      }),
    refetchOnWindowFocus: false,
  });

  if (error) {
    return <InternalServerError />;
  }

  return (
    <>
      <Filters />
      <PostCardGrid>
        {!isLoading ? (
          <>
            {data?.posts?.map((post: EPost) => (
              <PostCard key={post.id} {...post} />
            ))}
            <NewPostCard totalPosts={data?.count} />
          </>
        ) : (
          [...Array(3)].map((_, i) => (
            <SkeletonPostCard key={`skeletonCard${i}`} />
          ))
        )}
      </PostCardGrid>
    </>
  );
};
