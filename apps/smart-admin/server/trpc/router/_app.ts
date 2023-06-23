import { router } from '../trpc';

import { authRouter } from './auth-router';
import { metadataRouter } from './metadata-router';
import { userRouter } from './user-router';

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  metadata: metadataRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
