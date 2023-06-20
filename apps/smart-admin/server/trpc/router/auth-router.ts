import * as trpc from '@trpc/server';
import * as bcrypt from 'bcrypt';

import { signUpSchema } from '@smartcoorp/smart-auth';

import { publicProcedure, router } from '../trpc';

export const authRouter = router({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { username, email, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new trpc.TRPCError({
          code: 'CONFLICT',
          message: 'User already exists.',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await ctx.prisma.user.create({
        data: { username, email, password: hashedPassword },
      });

      return {
        status: 201,
        message: 'Account created successfully',
        result: result.email,
      };
    }),
});
