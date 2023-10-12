'use client';

import { createPresignedUrl } from '@smart-editor/actions/create-presigned-url';
import { deleteFile } from '@smart-editor/actions/delete-file';
import { uploadToS3 } from '@smart-editor/actions/upload-to-s3';
import { useState } from 'react';

export type SingleFileUpload = File | string | null | undefined;

type Props = {
  folder: string;
  initialFile: string | null;
};

export const useSingleFileUpload = ({ folder, initialFile }: Props) => {
  const [fileUrl, setFileUrl] = useState<string | undefined | null>(
    initialFile
  );

  const handleSingleFileUpload = async (file: SingleFileUpload) => {
    let newFileUrl = fileUrl;
    let key: string | null = '';

    try {
      if (fileUrl) {
        key = new URL(fileUrl).searchParams.get('key');
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}

    // UPLOAD / REPLACE IMAGE TO S3
    if (file instanceof File) {
      newFileUrl = await uploadToS3({
        getPresignedUrl: () =>
          createPresignedUrl({
            folder,
            key,
          }),
        file,
      });
    }

    // DELETE IMAGE FROM S3
    if (!file && fileUrl) {
      await deleteFile({
        key,
      });

      newFileUrl = null;
    }

    setFileUrl(newFileUrl);
    return newFileUrl;
  };

  return { handleSingleFileUpload };
};
