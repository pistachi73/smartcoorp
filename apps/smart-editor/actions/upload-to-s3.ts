export const uploadToS3 = async ({
  getPresignedUrl,
  file,
}: {
  getPresignedUrl: () => Promise<{
    url: string;
    fields: Record<string, string>;
    key: string;
  }>;
  file: File;
}): Promise<string> => {
  console.log('HOla');
  const { url, fields, key } = await getPresignedUrl();

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

export const getFileExtension = (file: File): string => {
  return file.name.split('.').pop() as string;
};
