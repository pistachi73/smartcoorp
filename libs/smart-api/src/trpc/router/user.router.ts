import { Role, User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { authorizedProcedure, publicProcedure, router } from '../trpc';

export const userRouter = router({
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
    });

    return users;
  }),

  getUserById: publicProcedure
    .input(z.number())
    .output(
      z.object({
        username: z.string(),
        email: z.string().email(),
        role: z.nativeEnum(Role),
        profileImageUrl: z.nullable(z.string()).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (input === -1)
        return {
          username: '',
          email: '',
          role: 'USER',
        };

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input,
        },
        select: {
          username: true,
          email: true,
          role: true,
          profileImageUrl: true,
        },
      });

      if (!user)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `User with id ${input} not found`,
        });

      return user;
    }),

  deleteUsers: authorizedProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;

      const users = await prisma.user.deleteMany({
        where: {
          id: {
            in: input.ids,
          },
        },
      });

      if (!users)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Users with ids ${input.ids} not found`,
        });

      return users;
    }),

  createUser: authorizedProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string().email(),
        role: z.nativeEnum(Role),
        password: z.string().min(8).max(32),
        profileImageUrl: z.nullable(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { email } = input;
      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists.',
        });
      }

      const user = await prisma.user.create({
        data: {
          ...input,
        },
      });

      return user as User;
    }),
  updateUser: authorizedProcedure
    .input(
      z.object({
        id: z.number(),
        username: z.string().optional(),
        email: z.string().email().optional(),
        role: z.enum(['ADMIN', 'USER'] as const).optional(),
        password: z.string().min(8).max(32).optional(),
        profileImageUrl: z.nullable(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { id, ...data } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { id },
      });

      if (!exists) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: "User doesn't already exists.",
        });
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data,
      });

      return updatedUser;
    }),
});
