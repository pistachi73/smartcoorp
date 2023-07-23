import type { AcceptedFileTypes } from './file-upload.types';

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB',
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const getSupportedFileTypesSnippet = (
  acceptedFileTypes?: AcceptedFileTypes
): string => {
  if (!acceptedFileTypes) return 'All file types supported';
  const numberOfAcceptedFileTypes = Object.keys(acceptedFileTypes).length;
  const fileTypes = Object.keys(acceptedFileTypes).map(
    (key) => key.split('/')[1]
  );

  if (fileTypes.length === 1) return `Supported ${fileTypes[0]} files`;

  const firstTypes = fileTypes
    .slice(0, numberOfAcceptedFileTypes - 1)
    .join(', ');
  const lastType = fileTypes[numberOfAcceptedFileTypes - 1];

  return `Supported ${firstTypes} and ${lastType} files`;
};
