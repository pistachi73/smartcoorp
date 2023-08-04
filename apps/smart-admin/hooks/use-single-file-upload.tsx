'use client';

import { getFileExtension, uploadFileToS3 } from '@smart-admin/media';
import { clientTRPC } from '@smart-admin/trpc';
import { useState } from 'react';

export type SingleFileUpload = File | string | null | undefined;

type Props = {
  folder: string;
};

export const useSingleFileUpload = ({ folder }: Props) => {
  const [currentFile, setCurrentFile] = useState<string | undefined | null>();
  const createPresignedUrl = clientTRPC.media.createPresignedUrl.useMutation();
  const deleteFile = clientTRPC.media.deleteFile.useMutation();

  const handleSingleFileUpload = async (file: SingleFileUpload) => {
    let fileUrl = currentFile;

    // UPLOAD IMAGE TO S3
    if (file instanceof File) {
      fileUrl = await uploadFileToS3({
        getPresignedUrl: () =>
          createPresignedUrl.mutateAsync({
            folder,
            fileExtension: getFileExtension(file),
            fileUrl: currentFile,
          }),
        file,
      });
    }

    // DELETE IMAGE FROM S3
    if (!file && currentFile) {
      await deleteFile.mutateAsync({
        fileUrl: currentFile,
        folder,
      });

      fileUrl = null;
    }

    setCurrentFile(fileUrl);
    return fileUrl;
  };

  return { handleSingleFileUpload, setCurrentFile };
};
