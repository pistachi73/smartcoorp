import type { CreatePresignedUrlOutput } from './create-presigned-url';

export const uploadToS3 = async ({
  getPresignedUrl,
  file,
}: {
  file: File;
  getPresignedUrl: () => CreatePresignedUrlOutput;
}): Promise<string> => {
  const { url, fields, key } = await getPresignedUrl();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const encodedKey = encodeURIComponent(key);

  return `https://smarteditor.app/api/assets?key=${encodedKey}`;
};
