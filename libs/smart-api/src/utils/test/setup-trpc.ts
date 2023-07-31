import { TRPCError } from '@trpc/server';
import { Session } from 'next-auth';

import { createContextInner } from '../../trpc/context';
import { appRouter } from '../../trpc/router/root';

import { prismaMock } from './setup-prisma-mock';

export const adminSession: Session = {
  user: {
    id: '1',
    role: 'ADMIN',
  },
  expires: '1',
};

export const userSession: Session = {
  user: {
    id: '1',
    role: 'USER',
  },
  expires: '1',
};

export const createCaller = (
  ctx: Partial<ReturnType<typeof createContextInner>> = {
    session: userSession,
    prisma: prismaMock,
  }
) =>
  appRouter.createCaller({
    session: ctx.session ?? userSession,
    prisma: ctx.prisma ?? prismaMock,
  });

export const expectErrorIfNoAuthroized = async (method: any) => {
  await expect(method).rejects.toThrow(
    new TRPCError({
      code: 'UNAUTHORIZED',
      message: "You don't have permission to access this resource",
    })
  );
};
