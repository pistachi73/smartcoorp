'use server';

import prisma from '@smartcoorp/prisma';

export const deletePost = async ({ postId }: { postId: string }) => {
  const deletedPost = await prisma.ePost.delete({
    where: {
      id: postId,
    },
  });

  if (!deletedPost) {
    return {
      error: 'Failed to delete post.',
    };
  }

  return {
    deletedPostId: deletedPost.id,
  };
};
