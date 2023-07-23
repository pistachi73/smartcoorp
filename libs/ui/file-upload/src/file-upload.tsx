'use client';

import { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { BiFile, BiTrashAlt, BiUpload } from 'react-icons/bi';
import {
  BsFillFileEarmarkFontFill,
  BsFillFileEarmarkMusicFill,
  BsFillFileEarmarkPdfFill,
  BsFillFileEarmarkPlayFill,
} from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { primary } from '@smartcoorp/ui/tokens';

import { Styled as S } from './file-upload.styles';
import type {
  ExtendedFile,
  FileType,
  FileUploadProps,
} from './file-upload.types';
import { formatBytes, getSupportedFileTypesSnippet } from './helpers';
export const FileUpload = ({
  className,
  acceptedFileTypes,
  multiple = false,
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
  const [files, setFiles] = useState<ExtendedFile[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setRejectedFiles(rejectedFiles);

      if (!acceptedFiles.length) return;

      const singleAcceptedFiles = acceptedFiles.filter(
        ({ name }) => !files.some((file) => file?.name === name)
      );

      setFiles((prevFiles) =>
        multiple
          ? [
              ...prevFiles,
              ...singleAcceptedFiles.map((file) => {
                const fileType = file?.type.split('/')[0] as FileType;
                return Object.assign(file, {
                  fileType,
                  preview:
                    fileType === 'image' ? URL.createObjectURL(file) : '',
                });
              }),
            ]
          : [
              Object.assign(singleAcceptedFiles[0], {
                fileType: singleAcceptedFiles[0]?.type.split(
                  '/'
                )[0] as FileType,
                preview:
                  singleAcceptedFiles[0].type.split('/')[0] === 'image'
                    ? URL.createObjectURL(singleAcceptedFiles[0])
                    : '',
              }),
            ]
      );

      onChange?.(
        multiple
          ? [
              ...(typeof value !== 'undefined' ? value : []),
              ...singleAcceptedFiles,
            ]
          : [singleAcceptedFiles[0]]
      );
    },
    [files, multiple, onChange, value]
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
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    if (value && onChange) {
      onChange(value.filter((file) => file.name !== fileName));
    }
  };

  return (
    <S.Container $isDisabled={isDisabled}>
      {label && (
        <div
          style={{
            marginBottom: '4px',
          }}
        >
          <S.Label htmlFor={getInputProps().id}>{label}</S.Label>
        </div>
      )}
      <S.DropzoneContainer
        {...getRootProps({
          className,
        })}
        $isDragActive={isDragActive}
        $isDragReject={isDragReject || isError}
      >
        <input {...getInputProps()} />
        <S.DropzoneInformationContainer>
          {singleFilePreview && !multiple && files.length === 1 ? (
            <S.SinglePreviewContiner>
              <S.SinglePreviewImageContainer>
                <PreviewImage file={files[0]} iconSize={54} />
              </S.SinglePreviewImageContainer>

              <S.SinglePreviewInfoContainer>
                <div>
                  <Body size="small" noMargin fontWeight="bold">
                    {files[0].name}
                  </Body>
                  <Body size="xsmall" variant="neutral" noMargin>
                    {formatBytes(files[0].size)}
                  </Body>
                </div>
                <S.PreviewDeleteButton
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    removeFile(files[0].name);
                  }}
                >
                  <BiTrashAlt />
                </S.PreviewDeleteButton>
              </S.SinglePreviewInfoContainer>
            </S.SinglePreviewContiner>
          ) : (
            <>
              <S.InformationIconContainer>
                <BiUpload size={22} />
              </S.InformationIconContainer>
              <Headline size="small">
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
          )}
        </S.DropzoneInformationContainer>
      </S.DropzoneContainer>

      {helperText && (
        <S.HelperText $isError={isError}>{helperText}</S.HelperText>
      )}

      {!singleFilePreview ? (
        <S.PreviewList>
          {files.map((file) => (
            <S.PreviewListItem key={file.name}>
              <S.PreviewInfoContainer>
                <S.PreviewImage>
                  <PreviewImage file={file} />
                </S.PreviewImage>
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
          ))}
        </S.PreviewList>
      ) : null}

      {showRejectedFiles && rejectedFiles.length ? (
        <S.RejectedFiles>
          <S.PreviewList>
            {rejectedFiles.map(({ errors, file }) => {
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

const PreviewImage = ({
  file,
  iconSize = 28,
}: {
  file: ExtendedFile;
  iconSize?: number;
}) => {
  return file.fileType === 'image' ? (
    <img
      src={file.preview}
      alt={file.name}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '4px',
      }}
    />
  ) : file.fileType === 'audio' ? (
    <BsFillFileEarmarkMusicFill size={iconSize} />
  ) : file.fileType === 'application' ? (
    <BsFillFileEarmarkPdfFill size={iconSize} />
  ) : file.fileType === 'video' ? (
    <BsFillFileEarmarkPlayFill size={iconSize} />
  ) : file.fileType === 'text' ? (
    <BsFillFileEarmarkFontFill size={iconSize} />
  ) : (
    <BiFile />
  );
};
