type CommonProps = {
  blockId: string;
  blockIndex: number;
  focusIndex: number;
  name: string;
  acceptedFileTypes: string;
  placeholder: string;
  handleUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type FileFieldProps = CommonProps;

// <input
// id={block.id}
// hidden
// ref={uploadImageRef}
// type="file"
// name="imageToUpload"
// accept="image/png,image/gif,image/jpeg"
// onChange={handleUploadImage}
// />
// <S.UploadImageButton
//   ref={(el: HTMLParagraphElement) => (refs.current[blockIndex] = el)}
//   onClick={handleOpenUploadImage}
//   data-placeholder="👉 Select image"
//   tabIndex={1}
//   noMargin
//   forwardedAs="button"
// />
