import * as trpc from '@trpc/server';
import * as bcrypt from 'bcrypt';
import * as z from 'zod';

import { publicProcedure, router } from '../trpc';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export const signUpSchema = loginSchema.extend({
  username: z.string(),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;

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
