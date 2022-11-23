import { TRPCError } from '@trpc/server';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import { User, UserDocument, UserInput } from '../../models';
import { publicProcedure, router } from '../../utils/trpc';

export const userRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .query(async ({ input }) => {
      console.log('Hola');
      const user: UserDocument | null = await User.findOne({
        email: input.email,
      });

      if (!user) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
      }

      const {
        _id: id,
        passwordHash,
        salt,
        roles,
        firstName,
        lastName,
        isVerified,
      } = user;
      const pepper = process.env.PEPPER_STRING;

      const isCorrect = await bcrypt.compare(
        salt + input.password + pepper,
        passwordHash
      );

      if (!isCorrect) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid username or password',
        });
      }

      const token = await jwt.sign(
        { id, email: input.email, roles, firstName, lastName, isVerified },
        process.env.JWT_SECRET as string,
        { expiresIn: '2d' }
      );

      return { token };
    }),
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(4),
        firstName: z.string().nullish(),
        lastName: z.string().nullish(),
        roles: z.array(z.string()).nullish(),
      })
    )
    .mutation(
      async ({ input: { email, password, firstName, lastName, roles } }) => {
        const salt = uuid();

        const pepper = process.env.PEPPER_STRING;

        const passwordHash = await bcrypt.hash(salt + password + pepper, 10);
        const verificationString = uuid();

        const userData: UserInput = {
          email,
          firstName: firstName ?? '',
          lastName: lastName ?? '',
          isVerified: false,
          salt,
          verificationString,
          passwordHash,
          roles: roles ?? [],
        };

        const createdUser = new User(userData);
        await createdUser.save();

        const token = await jwt.sign(
          {
            id: createdUser._id,
            email,
            isVerified: false,
            roles: userData.roles,
            firstName,
            lastName,
          },

          process.env.JWT_SECRET as string,
          {
            expiresIn: '2d',
          }
        );

        return { token };
      }
    ),
});
