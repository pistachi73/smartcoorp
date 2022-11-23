import { TRPCError } from '@trpc/server';
import * as jwt from 'jsonwebtoken';

import { middleware, publicProcedure } from '../utils/trpc';

const hasRoles = (roles: string[]) =>
  middleware(async ({ next, ctx }) => {
    const { authorization } = ctx;
    if (!authorization) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'No authorization header found',
      });
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Malformed authorization header',
      });
    }

    let payload: any;
    try {
      payload = await jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (err: unknown) {
      if (err instanceof Error)
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: err.message,
        });
    }

    if (roles?.some((role: string) => !payload.roles.includes(role)))
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: `User permissions are inssuficient.${roles.map((role, index) =>
          index == roles.length - 1 && roles.length > 1
            ? ` and ${role}`
            : ` ${role}`
        )} role${roles.length > 1 ? 's are' : ' is'} needed`,
      });

    return next({
      ctx: {
        user: payload,
      },
    });
  });

export const protectedProcedure = (roles: string[]) =>
  publicProcedure.use(hasRoles(roles));
