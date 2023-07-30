import { PrismaClient } from '@prisma/client';
import { type inferAsyncReturnType } from '@trpc/server';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';

import { nextAuthOptions } from '../common/next-auth-configuration';
import prisma from '../db/client';

type CreateContextOptions = {
  session: Session | null;
  prisma?: PrismaClient;
};

export const createContextInner = (opts: CreateContextOptions) => {
  return {
    prisma: opts.prisma ?? prisma,
    session: opts.session,
  };
};

export const createContext = async (ctx: FetchCreateContextFnOptions) => {
  const session = await getServerSession(nextAuthOptions);

  return createContextInner({
    session,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;

// export type Context = inferAsyncReturnType<typeof createContext>;
