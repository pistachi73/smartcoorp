import { z } from 'zod';

import { authorizedProcedure, router } from '../trpc';

export const userRouter = router({
  getAllUsers: authorizedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;
    const users = await prisma.user.findMany({
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

      return users;
    }),
});
