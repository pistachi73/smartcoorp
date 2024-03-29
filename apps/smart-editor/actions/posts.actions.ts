'use server';

import { EPostStatus } from '@prisma/client';
import { z } from 'zod';

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

const getPostSchema = z.object({
  userId: z.string(),
  postId: z.string(),
});

export type GetPostInput = z.infer<typeof getPostSchema>;

export const getPost = async (input: GetPostInput) => {
  'use server';
  const { userId, postId } = await getPostSchema.parseAsync(input);

  const post = await prisma.ePost.findFirst({
    where: {
      AND: [
        {
          userId: userId,
        },
        {
          id: postId,
        },
      ],
    },
  });

  return { post };
};

const getPostsSchema = z.object({
  userId: z.string().optional(),
  title: z.nullable(z.string()).optional(),
});

export type GetPostsInput = z.infer<typeof getPostsSchema>;

export const getPosts = async (input: GetPostsInput) => {
  'use server';

  const { title, userId } = await getPostsSchema.parseAsync(input);

  const data = await prisma.$transaction([
    prisma.ePost.findMany({
      where: {
        AND: [
          {
            userId,
          },
          {
            ...(title ? { title: { contains: title } } : {}),
          },
        ],
      },
    }),
    prisma.ePost.count({
      where: {
        userId,
      },
    }),
  ]);

  const [posts, count] = data;

  return {
    posts,
    count,
  };
};

const DeletePostSchema = z.object({
  postId: z.string(),
});

export type DeletePostInput = z.infer<typeof DeletePostSchema>;

export const deletePost = async (input: DeletePostInput) => {
  const { postId } = await DeletePostSchema.parseAsync(input);

  const deletedPost = await prisma.ePost.delete({
    where: {
      id: postId,
    },
  });

  return {
    postId: deletedPost.id,
  };
};

const UpdatePostSchema = z.object({
  postId: z.string(),
  data: z
    .object({
      title: z.string(),
      description: z.string(),
      status: z.nativeEnum(EPostStatus),
      coverImageUrl: z.nullable(z.string()),
      wordCount: z.number(),
      content: z.any(),
    })
    .partial(),
});

export type UpdatePostInput = z.infer<typeof UpdatePostSchema>;

export const updatePost = async (input: UpdatePostInput) => {
  const { postId, data } = await UpdatePostSchema.parseAsync(input);

  const post = await prisma.ePost.update({
    where: {
      id: postId,
    },
    data,
  });

  return {
    post,
  };
};

const CreatePostSchema = z.object({
  userId: z.string(),
});

export type CreatePostInput = z.infer<typeof CreatePostSchema>;

export const createPost = async (input: CreatePostInput) => {
  const { userId } = await CreatePostSchema.parseAsync(input);

  const post = await prisma.ePost.create({
    data: {
      userId,
      title: 'Add a title',
      content: defaultBlogPostContent,
    },
  });

  return {
    postId: post.id,
  };
};
