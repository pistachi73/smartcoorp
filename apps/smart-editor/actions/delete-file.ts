import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { z } from 'zod';

const InputSchema = z.object({
  key: z.nullable(z.string()),
});

type Input = z.infer<typeof InputSchema>;

export const deleteFile = async ({ key }: Input) => {
  const s3 = new S3Client({
    apiVersion: '2006-03-01',
    region: process.env['NEXT_PUBLIC_AWS_REGION'],
    credentials: {
      accessKeyId: process.env['NEXT_PUBLIC_AWS_ACCESS_KEY_ID'] as string,
      secretAccessKey: process.env[
        'NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY'
      ] as string,
    },
  });

  const command = new DeleteObjectCommand({
    Bucket: process.env['NEXT_PUBLIC_AWS_S3_BUCKET_NAME'] as string,
    Key: key || '',
  });

  try {
    const response = await s3.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }

  return true;
};
