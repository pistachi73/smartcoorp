import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { authorizedProcedure, router } from '../trpc';

export const blogAuthorsRouter = router({
  getAll: authorizedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    const authors = await prisma.blogPostAuthor.findMany();
    return authors;
  }),

  getById: authorizedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;
      const author = await prisma.blogPostAuthor.findUnique({
        where: { id },
      });

      if (!author) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Author not found',
        });
      }

      return author;
    }),

  delete: authorizedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;

      const author = await prisma.blogPostAuthor.delete({
        where: { id },
      });

      if (!author) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Author not found',
        });
      }

      return author;
    }),

  deleteMany: authorizedProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { ids } = input;

      const authors = await prisma.blogPostAuthor.deleteMany({
        where: { id: { in: ids } },
      });

      return authors;
    }),

  update: authorizedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        bio: z.string().optional(),
        website: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id, ...data } = input;

      const author = await prisma.blogPostAuthor.update({
        where: { id },
        data,
      });

      if (!author) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Author to update not found',
        });
      }

      return author;
    }),

  create: authorizedProcedure
    .input(
      z.object({
        name: z.string(),
        bio: z.string(),
        website: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { name, bio, website } = input;

      console.log(input);

      const author = await prisma.blogPostAuthor.create({
        data: {
          name,
          bio,
          website,
        },
      });

      if (!author) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Author not created',
        });
      }

      return author;
    }),
});
