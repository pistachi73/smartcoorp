import * as trpcExpress from '@trpc/server/adapters/express';
import * as S3 from 'aws-sdk/clients/s3';
import * as cors from 'cors';
import * as express from 'express';

import { initializeDbConnection } from './db';
import { routes } from './routes';
import { createContext } from './utils/create-context';
import { router } from './utils/trpc';
const PORT = process.env.PORT || 8080;

export const appRouter = router(routes);

export type AppRouter = typeof appRouter;

export const s3 = new S3({
  apiVersion: '2006-03-01',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_KEY as string,
  },
  region: process.env.S3_REGION as string,
  signatureVersion: 'v4',
});

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'development'
) {
  initializeDbConnection(process.env.DATABASE_ACCESS as string).then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  });
}
