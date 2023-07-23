import { Meta, StoryFn } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { Button } from '@smartcoorp/ui/button';
import { TemplateProps, noCanvas } from '@smartcoorp/ui/shared';

import { FileUpload } from './file-upload';
import { FileUploadProps } from './file-upload.types';
import { RHFFileUpload, RHFFileUploadProps } from './rhf-file-upload';

export default {
  title: 'Form/File Upload',
  description: 'FileUpload component for SC projects',
  component: FileUpload,

  parameters: {
    maxWidth: true,
    docs: {
      description: {
        component:
          "The FileUplaod component is a reusable user interface element that facilitates the process of uploading files from a user's device to a web application. It enables users to select one or multiple files from their local system and transfer them to the server for processing or storage.",
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
  },
} as Meta<typeof FileUpload>;

export const Default: TemplateProps<FileUploadProps> = {
  args: {
    acceptedFileTypes: {
      'image/jpg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  },
};
export const SingleFile: TemplateProps<FileUploadProps> = {
  args: {
    acceptedFileTypes: {
      'image/jpg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'application/pdf': ['.pdf'],
    },
    multiple: false,
    showRejectedFiles: true,
  },
};

export const MultipleFiles: TemplateProps<FileUploadProps> = {
  args: {
    acceptedFileTypes: {
      'image/jpg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'application/pdf': ['.pdf'],
    },
    multiple: true,
    maxFiles: 5,
  },
};

export const RestrictedTypes: TemplateProps<FileUploadProps> = {
  args: {
    acceptedFileTypes: {
      'application/pdf': ['.pdf'],
    },
    multiple: true,
  },
};

export const WithSinglePreview: TemplateProps<FileUploadProps> = {
  args: {
    acceptedFileTypes: {
      'image/jpg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'application/pdf': ['.pdf'],
    },
    multiple: false,
    singleFilePreview: true,
  },
};

export const DisabledFileUpload: TemplateProps<FileUploadProps> = {
  args: {
    isDisabled: true,
  },
};

export const ErrorFileUpload: TemplateProps<FileUploadProps> = {
  args: {
    isError: true,
  },
};
type FormValues = {
  files: File;
};
const WithReactHookFormTemplate: StoryFn<RHFFileUploadProps<FormValues>> = (
  args
) => {
  const { control, handleSubmit } = useForm<FormValues>({});
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <RHFFileUpload
        control={control}
        name="files"
        rules={{
          required: 'This field is required',
        }}
        defaultValue={args?.defaultValue}
        helperText={args.helperText}
        multiple={args.multiple}
        acceptedFileTypes={args.acceptedFileTypes}
        maxFiles={args.maxFiles}
        maxSize={args.maxSize}
        singleFilePreview={args.singleFilePreview}
      />

      <Button style={{ marginTop: '20px' }} type="submit">
        Submit
      </Button>
    </form>
  );
};

export const WithReactHookForm: TemplateProps<RHFFileUploadProps<FormValues>> =
  {
    render: WithReactHookFormTemplate,
    args: {},
    parameters: {
      ...noCanvas,
      docs: {
        description: {
          story: 'This is an example of how to use the component with **RHF**',
        },
        source: {
          code: `
<form onSubmit={handleSubmit(onSubmit)}>
<RHFFileUpload
control={control}
name="files"
rules={{
  required: 'This field is required',
}}
defaultValue={args?.defaultValue}
helperText={args.helperText}
/>
</form>`,
          language: 'tsx',
        },
      },
    },
  };
