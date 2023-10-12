'use server';

import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { nanoid } from '@smart-editor/utils/nanoid';
import { z } from 'zod';

const s3 = new S3Client({
  apiVersion: '2006-03-01',
  region: process.env['NEXT_PUBLIC_AWS_REGION'],
  credentials: {
    accessKeyId: process.env['NEXT_PUBLIC_AWS_ACCESS_KEY_ID'] as string,
    secretAccessKey: process.env['NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY'] as string,
  },
});

const UPLOAD_MAX_FILE_SIZE = 1000000;

const hasFileExtension = (fileName?: string) => {
  if (!fileName) return false;

  const lastDotIndex = fileName.lastIndexOf('.');

  return lastDotIndex !== -1 && lastDotIndex !== fileName.length - 1;
};

const CreatePresignedUrlInputSchema = z.object({
  folder: z.string(),
  key: z.nullable(z.string().optional()),
  defaultFileId: z.string().optional(),
});

const CreatePresignedUrlOutputSchema = z.promise(
  z.object({
    url: z.string(),
    fields: z.record(z.string()),
    key: z.string(),
  })
);

type CreatePresignedUrlInput = z.infer<typeof CreatePresignedUrlInputSchema>;
export type CreatePresignedUrlOutput = z.infer<
  typeof CreatePresignedUrlOutputSchema
>;
type CreatePresignedUrl = (
  input: CreatePresignedUrlInput
) => CreatePresignedUrlOutput;

export const createPresignedUrl: CreatePresignedUrl = async ({
  folder,
  key,
  defaultFileId,
}) => {
  const fileId = nanoid();

  const Fields = {};

  const Key = key || `${folder}/${defaultFileId || fileId}`;

  const presignedUrl = await createPresignedPost(s3, {
    Bucket: process.env['NEXT_PUBLIC_AWS_S3_BUCKET_NAME'] as string,
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
    key: presignedUrl?.fields?.['key'],
  };
};
