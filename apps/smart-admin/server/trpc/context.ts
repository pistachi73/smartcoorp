import { type inferAsyncReturnType } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';
import type { Session } from 'next-auth';

import { nextAuthOptions } from '../common/next-auth-configuration';
import { prisma } from '../db/client';

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = {
  session: Session | null;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 **/
export const createContextInner = async (opts: CreateContextOptions) => {
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
  const { req, res } = ctx;
  const session = await getServerSession(req, res, nextAuthOptions); // 👈 added this
  return await createContextInner({
    session,
  });
};

export type Context = inferAsyncReturnType<typeof createContext>;
