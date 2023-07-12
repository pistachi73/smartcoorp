import { router } from '../trpc';

import { authRouter } from './auth.router';
import { blogAuthorsRouter } from './blog/blog-post-authors.router';
import { blogPostRouter } from './blog/blog-posts.router';
import { metadataRouter } from './metadata.router';
import { userRouter } from './user.router';

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  metadata: metadataRouter,
  blogPostAuthors: blogAuthorsRouter,
  blogPost: blogPostRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
