import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';

import { AppRouter, appRouter } from './trpc/router/_app';
export { nextAuthOptions } from './common/next-auth-configuration';

export { createContext, createTRPCContext } from './trpc/context';
export { publicProcedure, authorizedProcedure, trpc } from './trpc/trpc';

// AUTH TYPES
export {
  type ILogin,
  type ISignUp,
  loginSchema,
  signUpSchema,
} from './trpc/router/auth.router';
/**
 * The `appRouter` export is used to configure the Next.js tRPC API endpoint, and the `AppRouter` type is used by the Next.js app to create the type-safe tRPC client.
 * @example
 */
export { appRouter, type AppRouter };

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
