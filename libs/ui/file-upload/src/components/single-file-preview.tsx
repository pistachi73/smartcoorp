import { BiTrashAlt } from 'react-icons/bi';

import Link from 'next/link';

import { Body } from '@smartcoorp/ui/body';
import { gray500 } from '@smartcoorp/ui/tokens';

import { formatBytes } from '../helpers';

import { Styled as S } from './../file-upload.styles';
import { PreviewImage } from './preview-image';

type SingleFilePreviewProps = {
  file: string | File;
  removeFile: (fileName: string) => void;
};

export const SingleFilePreview = ({
  file,
  removeFile,
}: SingleFilePreviewProps) => {
  if (file instanceof File) {
    return (
      <S.SinglePreviewContiner>
        <S.SinglePreviewImageContainer>
          <PreviewImage file={file} iconSize={54} />
        </S.SinglePreviewImageContainer>

        <S.SinglePreviewInfoContainer>
          <div>
            <Body size="small" noMargin fontWeight="bold">
              {file.name}
            </Body>
            <Body size="xsmall" variant="neutral" noMargin>
              {formatBytes(file.size)}
            </Body>
          </div>
          <S.PreviewDeleteButton
            type="button"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              removeFile(file.name);
            }}
          >
            <BiTrashAlt />
          </S.PreviewDeleteButton>
        </S.SinglePreviewInfoContainer>
      </S.SinglePreviewContiner>
    );
  }

  return (
    <S.SinglePreviewContiner>
      <S.SinglePreviewImageContainer>
        <PreviewImage file={file} iconSize={54} />
      </S.SinglePreviewImageContainer>

      <S.SinglePreviewInfoContainer>
        <div>
          <Body size="small" noMargin fontWeight="bold">
            File already uploaded
          </Body>

          <Body size="xsmall" variant="neutral" noMargin>
            Check file{' '}
            <Link href={file} style={{ color: gray500 }}>
              here
            </Link>
          </Body>
        </div>
        <S.PreviewDeleteButton
          type="button"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            removeFile(file);
          }}
        >
          <BiTrashAlt />
        </S.PreviewDeleteButton>
      </S.SinglePreviewInfoContainer>
    </S.SinglePreviewContiner>
  );
};
