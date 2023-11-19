'use client';

import { EPost } from '@prisma/client';
import { InternalServerError } from '@smart-editor/components/error-pages/internal-server-error';

import { Filters } from './filters';
import { NewPostCard, PostCard, SkeletonPostCard } from './post-card';
import { useGetPosts } from './posts.hooks';
import { PostCardGrid } from './posts.styles';

export const Posts = () => {
  const { data, isLoading, error } = useGetPosts();

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
