import { BiFile } from 'react-icons/bi';
import {
  BsFillFileEarmarkFontFill,
  BsFillFileEarmarkMusicFill,
  BsFillFileEarmarkPdfFill,
  BsFillFileEarmarkPlayFill,
} from 'react-icons/bs';

import { Styled as S } from '../file-upload.styles';
import type { FilePreview, FileType } from '../file-upload.types';

const imageExtensions = ['png', 'gif', 'jpeg', 'jpg'];
const videoExtensions = ['mp4', 'mov', 'avi', 'mkv'];
const audioExtensions = ['mp3', 'wav', 'ogg'];
const textExtensions = ['txt', 'md'];
const applicationExtensions = [
  'pdf',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
];

const checkFileType = (file: string | File): FileType => {
  const extension =
    typeof file === 'string'
      ? file.split('.').pop()?.toLowerCase() ?? ''
      : file.name.split('.').pop()?.toLowerCase() ?? '';

  if (imageExtensions.includes(extension)) return 'image';
  if (videoExtensions.includes(extension)) return 'video';
  if (audioExtensions.includes(extension)) return 'audio';
  if (textExtensions.includes(extension)) return 'text';
  if (applicationExtensions.includes(extension)) return 'application';

  return 'application';
};

export const PreviewImage = ({
  file,
  iconSize = 28,
}: {
  file: string | File;
  iconSize?: number;
}) => {
  const fileType: FileType = checkFileType(file);

  return fileType === 'image' ? (
    <S.PreviewImage
      src={
        typeof file === 'string'
          ? `${file}?${new Date().getTime()}`
          : URL.createObjectURL(file)
      }
      alt={typeof file === 'string' ? `Uploaded image: ${file}` : file.name}
    />
  ) : fileType === 'audio' ? (
    <BsFillFileEarmarkMusicFill size={iconSize} />
  ) : fileType === 'application' ? (
    <BsFillFileEarmarkPdfFill size={iconSize} />
  ) : fileType === 'video' ? (
    <BsFillFileEarmarkPlayFill size={iconSize} />
  ) : fileType === 'text' ? (
    <BsFillFileEarmarkFontFill size={iconSize} />
  ) : (
    <BiFile />
  );
};
