'use server';

import prisma from '@smartcoorp/prisma';

const defaultBlogPostContent = {
  blocks: {
    '0': {
      id: '0',
      chainId: 'main',
      type: 'header',
      data: {
        level: 3,
        text: 'Write your blog',
      },
    },
  },
  chains: {
    main: ['0'],
  },
};

export const createPost = async ({ userId }: { userId: string }) => {
  const post = await prisma.ePost.create({
    data: { userId, content: defaultBlogPostContent },
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
