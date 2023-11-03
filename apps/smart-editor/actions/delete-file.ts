import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';
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

export const deleteFolder = async ({ folder }: { folder: string }) => {
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

  const listCommand = new ListObjectsV2Command({
    Bucket: process.env['NEXT_PUBLIC_AWS_S3_BUCKET_NAME'] as string,
    Prefix: folder, // the 'folder'
  });

  const list = await s3.send(listCommand); // get the list

  if (list.KeyCount) {
    // if items to delete
    // delete the files
    const deleteCommand = new DeleteObjectsCommand({
      Bucket: process.env['NEXT_PUBLIC_AWS_S3_BUCKET_NAME'] as string,
      Delete: {
        Objects: list?.Contents?.map((item) => ({ Key: item.Key })), // array of keys to be deleted
        Quiet: false, // provides info on successful deletes
      },
    });
    const deleted = await s3.send(deleteCommand); // delete the files
    // log any errors deleting files
    if (deleted.Errors) {
      deleted.Errors.map((error) =>
        console.log(`${error.Key} could not be deleted - ${error.Code}`)
      );
    }
    return `${deleted?.Deleted?.length} files deleted.`;
  }
};
