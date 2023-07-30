'use client';

export const uploadFileToS3 = async ({
  getPresignedUrl,
  file,
}: {
  getPresignedUrl: () => Promise<{
    url: string;
    fields: Record<string, string>;
    fileUrl: string;
  }>;
  file: File;
}): Promise<string> => {
  const { url, fields, fileUrl } = await getPresignedUrl();

  const data: Record<string, any> = {
    ...fields,
    'Content-Type': file.type,
    file,
  };

  const formData = new FormData();
  for (const name in data) {
    formData.append(name, data[name]);
  }
  await fetch(url, {
    method: 'POST',
    body: formData,
  });

  return fileUrl;
};
