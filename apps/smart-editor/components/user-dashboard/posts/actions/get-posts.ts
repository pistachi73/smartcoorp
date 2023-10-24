'use server';

import prisma from '@smartcoorp/prisma';

type GetPostsProps = {
  userId: string;
  title: string | null;
};

export const getPosts = async ({ userId, title }: GetPostsProps) => {
  try {
    const [posts, count] = await prisma.$transaction([
      prisma.ePost.findMany({
        where: {
          userId,
          ...(title ? { title: { contains: title } } : {}),
        },
      }),
      prisma.ePost.count({
        where: {
          userId,
        },
      }),
    ]);
    return { posts, totalPosts: count };
  } catch (e) {
    throw new Error('Failed to get posts.');
  }
};

export const getPost = async ({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) => {
  try {
    const post = await prisma.ePost.findFirst({
      where: {
        id: postId,
        userId: userId,
      },
    });
    return post;
  } catch (e) {
    console.log(e);

    return null;

    // throw new Error('Failed to get post.');
  }
};
