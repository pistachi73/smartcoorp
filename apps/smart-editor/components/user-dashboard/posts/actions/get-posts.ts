'use server';

import prisma from '@smartcoorp/prisma';

type GetPostsProps = {
  userId: string;
  title: string | null;
};

export const getPosts = async ({ userId, title }: GetPostsProps) => {
  console.log({ userId });
  const posts = await prisma.ePost.findMany({
    where: {
      userId,
      ...(title ? { title: { contains: title } } : {}),
    },
  });

  if (!posts) {
    throw new Error('Failed to get posts.');
  }

  return posts;
};

export const getPost = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) => {
  const post = await prisma.ePost.findFirst({
    where: {
      id: postId,
      userId: userId,
    },
  });

  if (!post) {
    throw new Error('Failed to get post.');
  }

  return post;
};
