import { type inferAsyncReturnType } from '@trpc/server';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';
import superjson from 'superjson';

import { nextAuthOptions } from '../common/next-auth-configuration';
import { prisma } from '../db/client';

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = {
  req?: Request;
  session?: Session | null;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = (opts: CreateContextOptions) => {
  return {
    prisma,
    session: opts.session,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (ctx: CreateNextContextOptions) => {
  const session = await getServerSession(nextAuthOptions); // 👈 added this
  return createContextInner({
    session,
  });
};

const createInnerTRPCContext = ({ session }: CreateContextOptions) => {
  return {
    session,
    prisma,
  };
};

export const createTRPCContext = async ({
  req,
}: FetchCreateContextFnOptions) => {
  const session = await getServerSession(nextAuthOptions); // 👈 added this

  return createInnerTRPCContext({ session });
};

export type Context = inferAsyncReturnType<typeof createTRPCContext>;

// export type Context = inferAsyncReturnType<typeof createContext>;
