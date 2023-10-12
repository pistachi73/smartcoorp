'use server';

import { z } from 'zod';

import prisma from '@smartcoorp/prisma';

const UpdatePostSchema = z.object({
  userId: z.number(),
  postId: z.number(),
  data: z.any(),
});

export type UpdatePostInput = z.infer<typeof UpdatePostSchema>;

export const updatePost = async ({ userId, postId, data }: UpdatePostInput) => {
  let post = null;
  try {
    post = await prisma.ePost.update({
      where: {
        id: postId,
        userId: userId,
      },
      data,
    });
  } catch (error) {
    return {
      error: 'Failed to update post.',
    };
  }

  return {
    post,
  };
};
