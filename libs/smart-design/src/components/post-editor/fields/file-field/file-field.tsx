import { useCallback, useRef } from 'react';

import { useRefs } from '../../hooks';
import { TextBoxField } from '../text-box-field/text-box-field.styles';

import * as S from './file-field.styles';
import { FileFieldProps } from './file-field.types';
export const FileField: React.FC<FileFieldProps> = ({
  acceptedFileTypes,
  blockId,
  blockIndex,
  focusIndex,
  placeholder,
  name,
  handleUploadFile,
}) => {
  const uploadImageRef = useRef<HTMLInputElement>(null);
  const { addFocusableRef } = useRefs();

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
        id={blockId}
        hidden
        ref={uploadImageRef}
        type="file"
        name={name}
        accept={acceptedFileTypes}
        onChange={handleUploadFile}
      />

      <S.UploadFileButton
        ref={addFocusableRef(blockIndex, focusIndex)}
        data-placeholder={placeholder}
        onClick={handleOpenUploadFile}
        onKeyDown={handleKeyDown}
        tabIndex={1}
      />
    </>
  );
};

{
  /* <input
id={block.id}
hidden
ref={uploadImageRef}
type="file"
name="imageToUpload"
accept="image/png,image/gif,image/jpeg"
onChange={handleUploadImage}
/>
<S.UploadImageButton
  ref={(el: HTMLParagraphElement) => (refs.current[blockIndex] = el)}
  onClick={handleOpenUploadImage}
  data-placeholder="👉 Select image"
  tabIndex={1}
  noMargin
  forwardedAs="button"
/> */
}
