import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';

import { Context } from './context';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

export const publicProcedure = t.procedure;

const isAuthorized = t.middleware(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Unauthorized',
    });
  }

  if (ctx.session.user.role !== 'ADMIN') {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: "You don't have permission to access this resource",
    });
  }
  return next({ ctx });
});
export const authorizedProcedure = t.procedure.use(isAuthorized);
