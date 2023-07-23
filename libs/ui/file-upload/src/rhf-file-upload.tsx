'use client';

import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from 'react-hook-form';

import { FileUpload } from './file-upload';
import type { FileUploadProps } from './file-upload.types';

type OmittedFileUploadProps = Omit<FileUploadProps, 'value' | 'onChange'>;

export type RHFFileUploadProps<FormValues extends FieldValues> =
  OmittedFileUploadProps & {
    control: Control<FormValues>;
    name: Path<FormValues>;
    rules?: RegisterOptions;
    defaultValue?: PathValue<FormValues, Path<FormValues>> | undefined;
  };

export const RHFFileUpload = <FormValues extends FieldValues>({
  control,
  rules,
  name,
  defaultValue,
  ...props
}: RHFFileUploadProps<FormValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <FileUpload
          {...field}
          {...props}
          isError={props.isError ?? Boolean(error)}
          helperText={error ? error.message : props?.helperText}
        />
      )}
    />
  );
};
