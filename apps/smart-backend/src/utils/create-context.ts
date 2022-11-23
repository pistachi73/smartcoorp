import { inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

// created for each request
export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return { authorization: req.headers.authorization || null, user: null };
}; // no context

export type Context = inferAsyncReturnType<typeof createContext>;
