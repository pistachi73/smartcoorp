type CommonProps = {
  blockId: string;
  blockIndex: number;
  fieldIndex: number;
  name: string;
  acceptedFileTypes: string;
  placeholder: string;
  handleUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type FileFieldProps = CommonProps;
