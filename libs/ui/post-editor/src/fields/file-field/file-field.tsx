import { useCallback, useRef } from 'react';

import { Body } from '@smartcoorp/ui/body';

import { useRefsContext } from '../../contexts/refs-context';

import * as S from './file-field.styles';
import { FileFieldProps } from './file-field.types';
export const FileField: React.FC<FileFieldProps> = ({
  acceptedFileTypes,
  blockId,
  blockIndex,
  fieldIndex,
  placeholder,
  name,
  handleUploadFile,
  error,
}) => {
  const uploadImageRef = useRef<HTMLInputElement>(null);
  const { addFieldRef } = useRefsContext();

  const handleOpenUploadFile = useCallback(() => {
    if (uploadImageRef.current) {
      uploadImageRef.current.click();
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleOpenUploadFile();
      }
    },
    [handleOpenUploadFile]
  );
  return (
    <>
      <input
        hidden
        ref={uploadImageRef}
        type="file"
        name={name}
        accept={acceptedFileTypes}
        onChange={handleUploadFile}
      />

      <S.UploadFileButton
        size="small"
        id={`${blockId}_${fieldIndex}`}
        ref={addFieldRef(blockIndex, fieldIndex)}
        onClick={handleOpenUploadFile}
        onKeyDown={handleKeyDown}
        tabIndex={1}
        $error={error}
      >
        {placeholder}
      </S.UploadFileButton>
      {error && (
        <Body size="xsmall" noMargin variant="error">
          File size too large. Max size: 500kb
        </Body>
      )}
    </>
  );
};
