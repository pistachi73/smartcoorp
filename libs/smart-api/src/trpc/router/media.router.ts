import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { TRPCError } from '@trpc/server';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import { authorizedProcedure, publicProcedure, router } from '../trpc';

export const s3 = new S3Client({
  apiVersion: '2006-03-01',
  region: process.env['AWS_REGION'],
  credentials: {
    accessKeyId: process.env['AWS_ACCESS_KEY_ID'] as string,
    secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'] as string,
  },
});

const UPLOAD_MAX_FILE_SIZE = 1000000;

const hasFileExtension = (fileName?: string) => {
  if (!fileName) return false;

  const lastDotIndex = fileName.lastIndexOf('.');

  return lastDotIndex !== -1 && lastDotIndex !== fileName.length - 1;
};

export const mediaRouter = router({
  createPresignedUrl: publicProcedure
    .input(
      z.object({
        folder: z.string(),
        fileExtension: z.string(),
        fileUrl: z.nullable(z.string().optional()),
      })
    )
    .mutation(async ({ input }) => {
      const { folder, fileExtension, fileUrl } = input;

      const fileId = nanoid();

      const Fields = {};

      const fileName = fileUrl?.split('/').pop();

      if (fileUrl && !hasFileExtension(fileName)) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid file url',
        });
      }

      const Key = `${folder}/${
        fileUrl ? fileName : `${fileId}.${fileExtension}`
      }`;

      const presignedUrl = await createPresignedPost(s3, {
        Bucket: process.env['AWS_S3_BUCKET_NAME'] as string,
        Key,
        Expires: 600,
        Fields,
        Conditions: [
          ['starts-with', '$Content-Type', ''],
          ['content-length-range', 0, UPLOAD_MAX_FILE_SIZE],
        ],
      });

      return {
        ...presignedUrl,
        fileUrl: `${presignedUrl?.url}${presignedUrl?.fields?.['key']}`,
      };
    }),

  deleteFile: authorizedProcedure
    .input(
      z.object({
        fileUrl: z.string(),
        folder: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { fileUrl, folder } = input;

      const fileName = fileUrl.split('/').pop();
      const Key = `${folder}/${fileName}`;

      const command = new DeleteObjectCommand({
        Bucket: process.env['AWS_S3_BUCKET_NAME'] as string,
        Key,
      });

      try {
        const response = await s3.send(command);
        console.log(response);
      } catch (err) {
        console.error(err);
      }

      return true;
    }),
});
