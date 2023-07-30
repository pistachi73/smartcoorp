import { FileError } from 'react-dropzone';

import { Body } from '@smartcoorp/ui/body';

import { Styled as S } from './../file-upload.styles';

type RejectedFilePreviewProps = { file: File; errors: FileError[] };

export const RejectedFilePreview = ({
  file,
  errors,
}: RejectedFilePreviewProps) => {
  return (
    <S.PreviewListItem key={file.name} $isRejected={true}>
      <Body size="small" noMargin fontWeight="bold">
        {file.name}
      </Body>

      {errors.map((e) => (
        <Body
          key={`${file.name}_${e.code}`}
          size="xsmall"
          variant="error"
          noMargin
        >
          {e.message}
        </Body>
      ))}
    </S.PreviewListItem>
  );
};
