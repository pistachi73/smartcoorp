import { router } from '../trpc';

import { authRouter } from './auth.router';
import { blogAuthorsRouter } from './blog-post-authors.router';
import { blogPostRouter } from './blog-posts.router';
import { mediaRouter } from './media.router';
import { metadataRouter } from './metadata.router';
import { userRouter } from './user.router';

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  metadata: metadataRouter,
  blogPostAuthors: blogAuthorsRouter,
  blogPost: blogPostRouter,
  media: mediaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
