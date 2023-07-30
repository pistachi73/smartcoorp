import { Multiple } from '../../select/src/select.stories';
export type ImageExtensions = 'png' | 'gif' | 'jpeg' | 'jpg';
export type VideoExtensions = 'mp4' | 'mov' | 'avi' | 'mkv';
export type AudioExtensions = 'mp3' | 'wav' | 'ogg';
export type TextExtensions = 'txt' | 'md';
export type ApplicationExtensions =
  | 'pdf'
  | 'doc'
  | 'docx'
  | 'xls'
  | 'xlsx'
  | 'ppt'
  | 'pptx';

export type AcceptedFileTypes = {
  [key in `image/${ImageExtensions}`]?: `.${ImageExtensions}`[];
} & {
  [key in `video/${VideoExtensions}`]?: `.${VideoExtensions}`[];
} & {
  [key in `audio/${AudioExtensions}`]?: `.${AudioExtensions}`[];
} & {
  [key in `text/${TextExtensions}`]?: `.${TextExtensions}`[];
} & {
  [key in `application/${ApplicationExtensions}`]?: `.${ApplicationExtensions}`[];
};

export type FileType = 'image' | 'video' | 'audio' | 'text' | 'application';

export interface ExtendedFile extends File {
  preview?: string;
  fileType: FileType;
}

export type FilePreview = {
  name: string;
  preview: string;
  size: number;
  fileType: FileType;
};

export type FileUploadProps = {
  /** Cusotm css */
  className?: string;
  /** Accepted file types */
  acceptedFileTypes?: AcceptedFileTypes;
  /** The maximum size of the files */
  maxSize?: number;
  /**Maximum accepted number of files The default value is 0 which means there is no limitation to how many files are accepted. */
  maxFiles?: number;

  /** Show Rejected files */
  showRejectedFiles?: boolean;
  /** Disable the input or textarea */
  isDisabled?: boolean;
  /** Set error state */
  isError?: boolean;
  /** Form field helper text */
  helperText?: string;
  /** The label attribute for the input element */
  label?: string;
} & (
  | {
      /**  Can upload multiple files */
      multiple: true;
      /** Files */
      value: (File | string)[];
      /** On file change */
      onChange?: (files: (File | string)[]) => void;
      /** Show Single file preview */
      singleFilePreview?: never;
    }
  | {
      multiple?: false;
      value: File | string;
      onChange?: (file: File | string) => void;
      /** Show Single file preview */
      singleFilePreview?: boolean;
    }
);
