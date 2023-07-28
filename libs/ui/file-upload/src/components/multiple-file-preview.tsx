import { Preview } from '@storybook/react';
import { BiTrashAlt } from 'react-icons/bi';

import { Body } from '@smartcoorp/ui/body';

import type { FilePreview } from '../file-upload.types';
import { formatBytes } from '../helpers';

import { Styled as S } from './../file-upload.styles';
import { PreviewImage } from './preview-image';

type MultipleFilePreviewProps = {
  file: string | File;
  removeFile: (fileName: string) => void;
};

export const MultipleFilePreview = ({
  file,
  removeFile,
}: MultipleFilePreviewProps) => {
  if (typeof file !== 'string') {
    return (
      <S.PreviewListItem key={file.name}>
        <S.PreviewInfoContainer>
          <S.PreviewImageContainer>
            <PreviewImage file={file} />
          </S.PreviewImageContainer>
          <div>
            <Body size="small" noMargin fontWeight="bold">
              {file.name}
            </Body>
            <Body size="xsmall" variant="neutral" noMargin>
              {formatBytes(file.size)}
            </Body>
          </div>
        </S.PreviewInfoContainer>
        <S.PreviewDeleteButton onClick={() => removeFile(file.name)}>
          <BiTrashAlt />
        </S.PreviewDeleteButton>
      </S.PreviewListItem>
    );
  }

  return <div>testing</div>;
};
