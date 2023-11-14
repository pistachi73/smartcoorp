import { BiUpload } from 'react-icons/bi';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { primary } from '@smartcoorp/ui/tokens';

import { Styled as S } from '../file-upload.styles';
import type { AcceptedFileTypes } from '../file-upload.types';
import { getSupportedFileTypesSnippet } from '../helpers';

type UploadDropzoneInformationProps = {
  acceptedFileTypes?: AcceptedFileTypes;
};

export const UploadDropzoneInformation = ({
  acceptedFileTypes,
}: UploadDropzoneInformationProps) => {
  return (
    <>
      <S.InformationIconContainer>
        <BiUpload size={22} />
      </S.InformationIconContainer>
      <Headline size="small" as="p">
        Drag and drop files, or{' '}
        <span
          style={{
            color: primary,
          }}
        >
          Browse
        </span>
      </Headline>
      <Body size="xsmall" variant="neutral" noMargin>
        {getSupportedFileTypesSnippet(acceptedFileTypes)}
      </Body>
    </>
  );
};
