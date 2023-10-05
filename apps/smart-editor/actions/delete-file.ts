import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { z } from 'zod';

export const s3 = new S3Client({
  apiVersion: '2006-03-01',
  region: process.env['AWS_REGION'],
  credentials: {
    accessKeyId: process.env['AWS_ACCESS_KEY_ID'] as string,
    secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'] as string,
  },
});

const InputSchema = z.object({
  fileUrl: z.string(),
  folder: z.string(),
});

type Input = z.infer<typeof InputSchema>;

export const deleteFile = async ({ folder, fileUrl }: Input) => {
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
};
