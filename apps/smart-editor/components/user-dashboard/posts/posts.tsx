'use client';

import { EPost } from '@prisma/client';
import { getBaseUrl } from '@smart-editor/utils/get-base-url';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { useQuery } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import prisma from '@smartcoorp/prisma';

import { getPosts } from './actions/get-posts';
import { Filters } from './filters';
import { PostCard, SkeletonPostCard } from './post-card';
import { NewPostCard } from './post-card/new-post-card';
import { NoPostsFoundCard } from './post-card/no-posts-found-card';
import { PostCardGrid } from './posts.styles';

type PostsProps = {
  userId: string;
};

export const Posts = ({ userId }: PostsProps) => {
  const searchParams = useSearchParams();
  const { data: posts, isLoading } = useQuery(
    ['posts', searchParams],
    async () =>
      await getPosts({
        userId,
        title: searchParams.get('title'),
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <Filters />
      <PostCardGrid>
        {isLoading ? (
          [...Array(2)].map((e, i) => (
            <SkeletonPostCard key={`skeletonCard${i}`} />
          ))
        ) : posts?.length ? (
          posts?.map((post: EPost) => <PostCard key={post.id} {...post} />)
        ) : (
          <NoPostsFoundCard />
        )}

        <NewPostCard totalPosts={posts?.length} />
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
