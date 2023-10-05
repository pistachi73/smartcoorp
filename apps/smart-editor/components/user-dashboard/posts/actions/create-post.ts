'use server';

import prisma from '@smartcoorp/prisma';

export const createPost = async (userId: number) => {
  const post = await prisma.ePost.create({
    data: { userId },
  });

  if (!post) {
    return {
      error: 'Failed to create post.',
    };
  }

  return {
    postId: post.id,
  };
};
