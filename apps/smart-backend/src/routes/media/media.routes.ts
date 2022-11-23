import S3 = require('aws-sdk/clients/s3');
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import { publicProcedure, router } from '../../utils/trpc';

const s3 = new S3({
  region: 'eu-central-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY as string,
    secretAccessKey: process.env.S3_SECRET_KEY as string,
  },
});

export const mediaRouter = router({
  createPresignedUrl: publicProcedure
    .input(
      z.object({
        id: z.string(),
        ext: z.string(),
      })
    )
    .mutation(async ({ input: { id, ext } }) => {
      return new Promise<S3.PresignedPost>((resolve, reject) => {
        s3.createPresignedPost(
          {
            Fields: {
              key: `${id}.${ext}`,
            },
            Conditions: [
              ['starts-with', '$Content-Type', 'image/'],
              ['content-length-range', 0, 10000000],
            ],
            Expires: 30,
            Bucket: 'smart-coaching',
          },
          (err, signed: S3.PresignedPost) => {
            if (err) reject(err);
            resolve(signed);
          }
        );
      });
    }),
});
