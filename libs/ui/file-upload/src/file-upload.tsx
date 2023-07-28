'use client';

import { useCallback, useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { RxCross2 } from 'react-icons/rx';

import { MultipleFilePreview } from './components/multiple-file-preview';
import { RejectedFilePreview } from './components/rejected-file-preview';
import { SingleFilePreview } from './components/single-file-preview';
import { UploadDropzoneInformation } from './components/upload-dropzone-information';
import { Styled as S } from './file-upload.styles';
import type { FilePreview, FileUploadProps } from './file-upload.types';
import { fileFilter, getFileInfo } from './helpers';
export const FileUpload = ({
  className,
  acceptedFileTypes,
  multiple,
  maxFiles = 0,
  maxSize = 1024 * 1000,
  singleFilePreview = false,
  showRejectedFiles = true,
  value,
  onChange,
  label,
  isError,
  isDisabled,
  helperText,
}: FileUploadProps) => {
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setRejectedFiles(rejectedFiles);

      if (!acceptedFiles.length) return;

      const singleAcceptedFiles = acceptedFiles.filter(({ name }) => {
        if (multiple) return !value.some(fileFilter(name));
        else return true;
      });

      if (multiple) {
        onChange?.([
          ...(typeof value !== 'undefined' ? value : []),
          ...singleAcceptedFiles,
        ]);
      } else {
        onChange?.(singleAcceptedFiles[0]);
      }
    },
    [multiple, onChange, value]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: acceptedFileTypes,
      multiple,
      maxSize,
      maxFiles,
    });

  const removeFile = (fileName: string) => {
    if (multiple) {
      onChange?.(value?.filter(fileFilter(fileName)));
    } else {
      onChange?.('');
    }
  };

  return (
    <S.Container $isDisabled={isDisabled}>
      {label && (
        <S.LabelContainer>
          <S.Label htmlFor={getInputProps().id}>{label}</S.Label>
        </S.LabelContainer>
      )}
      <S.DropzoneContainer
        {...getRootProps({
          className,
        })}
        $isDragActive={isDragActive}
        $isDragReject={isDragReject || isError}
        $isSingleFileUploaded={!multiple && typeof value === 'string'}
      >
        <input {...getInputProps()} />
        <S.DropzoneInformationContainer>
          {singleFilePreview && !multiple && value ? (
            <SingleFilePreview file={value} removeFile={removeFile} />
          ) : (
            <UploadDropzoneInformation acceptedFileTypes={acceptedFileTypes} />
          )}
        </S.DropzoneInformationContainer>
      </S.DropzoneContainer>

      {helperText && (
        <S.HelperText $isError={isError}>{helperText}</S.HelperText>
      )}

      {!singleFilePreview ? (
        <S.PreviewList>
          {multiple ? (
            value.map((file) => (
              <MultipleFilePreview
                key={typeof file === 'string' ? file : file.name}
                file={file}
                removeFile={removeFile}
              />
            ))
          ) : (
            <MultipleFilePreview
              key={typeof value === 'string' ? value : value.name}
              file={value}
              removeFile={removeFile}
            />
          )}
        </S.PreviewList>
      ) : null}

      {showRejectedFiles && rejectedFiles.length ? (
        <S.RejectedFiles>
          <S.PreviewList>
            {rejectedFiles.map(({ errors, file }) => {
              return (
                <RejectedFilePreview
                  key={file.name}
                  file={file}
                  errors={errors}
                />
              );
            })}
          </S.PreviewList>
          <S.RejectedFilesClose
            variant="text"
            icon={RxCross2}
            size="small"
            onClick={() => setRejectedFiles([])}
          />
        </S.RejectedFiles>
      ) : null}
    </S.Container>
  );
};
