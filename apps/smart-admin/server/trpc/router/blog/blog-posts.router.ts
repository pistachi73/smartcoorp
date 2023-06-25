import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { authorizedProcedure, router } from '../../trpc';

export const blogPostRouter = router({
  getAll: authorizedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    const posts = await prisma.blogPost.findMany();
    return posts;
  }),

  getById: authorizedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;
      const post = await prisma.blogPost.findUnique({
        where: { id },
      });

      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        });
      }

      return post;
    }),

  delete: authorizedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;

      const post = await prisma.blogPost.delete({
        where: { id },
      });

      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found',
        });
      }

      return post;
    }),

  deleteMany: authorizedProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { ids } = input;

      const posts = await prisma.blogPost.deleteMany({
        where: { id: { in: ids } },
      });

      return posts;
    }),

  update: authorizedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        authorId: z.number().optional(),
        published: z.boolean().optional(),
        readTime: z.number().optional(),
        content: z.any(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id, ...data } = input;

      const post = await prisma.blogPost.update({
        where: { id },
        data,
      });

      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post to update not found',
        });
      }

      return post;
    }),

  create: authorizedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        authorId: z.number(),
        published: z.boolean(),
        readTime: z.number(),
        content: z.any(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { authorId, content, ...rest } = input;

      if (!content) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Content is required',
        });
      }
      const author = await prisma.blogPostAuthor.findUnique({
        where: { id: authorId },
      });

      if (!author) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Author not found',
        });
      }

      const post = await prisma.blogPost.create({
        data: {
          content,
          authorId,
          ...rest,
        },
      });

      if (!post) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Author not created',
        });
      }

      return post;
    }),
});
