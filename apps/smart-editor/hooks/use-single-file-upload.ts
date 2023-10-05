'use client';

import { createPresignedUrl } from '@smart-editor/actions/create-presigned-url';
import { deleteFile } from '@smart-editor/actions/delete-file';
import {
  getFileExtension,
  uploadToS3,
} from '@smart-editor/actions/upload-to-s3';
import { useState } from 'react';

export type SingleFileUpload = File | string | null | undefined;

type Props = {
  folder: string;
  initialFile: string | null;
};

export const useSingleFileUpload = ({ folder, initialFile }: Props) => {
  const [currentFile, setCurrentFile] = useState<string | undefined | null>(
    initialFile
  );

  const handleSingleFileUpload = async (file: SingleFileUpload) => {
    let fileUrl = currentFile;

    console.log('Init', { file });

    // UPLOAD IMAGE TO S3
    if (file instanceof File) {
      console.log('isFile');
      fileUrl = await uploadToS3({
        getPresignedUrl: () =>
          createPresignedUrl({
            folder,
            fileExtension: getFileExtension(file),
            fileUrl: currentFile,
          }),
        file,
      });
    }

    // DELETE IMAGE FROM S3
    if (!file && currentFile) {
      await deleteFile({
        fileUrl: currentFile,
        folder,
      });

      fileUrl = null;
    }

    console.log('FInal', { fileUrl });

    setCurrentFile(fileUrl);
    return fileUrl;
  };

  return { handleSingleFileUpload };
};
