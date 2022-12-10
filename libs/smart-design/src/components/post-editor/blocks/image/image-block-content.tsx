import { memo, useRef, useState } from 'react';

import { useUpdateBlocks } from '../../contexts/block-context';
import { useRefs } from '../../contexts/refs-context';
import { waitForElement } from '../../helpers/wait-for-element';
import { useBlockNavigation } from '../../hooks';
import {
  BlockContainer,
  BlockContent,
  InputBox,
} from '../../post-editor.styles';
import { ImageBlockProps } from '../../post-editor.types';

import * as S from './image-block.styles';

type ImageBlockContentProps = {
  blockIndex: number;
  block: ImageBlockProps;
};

export const ImageBlockContent = memo<ImageBlockContentProps>(
  ({ blockIndex, block }) => {
    const { setBlocks } = useUpdateBlocks();
    const { refs } = useRefs();
    const { handleBlockNavigation } = useBlockNavigation(blockIndex);
    const [imagePreview, setImagePreview] = useState<
      string | ArrayBuffer | null
    >();
    const uploadImageRef = useRef<HTMLInputElement>(null);

    const handleOpenUploadImage = () => {
      if (uploadImageRef.current) {
        uploadImageRef.current.click();
      }
    };

    const handleUploadImage = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = e.target.files?.[0];

      if (!file) return;

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImagePreview(reader.result);
      });
      reader.readAsDataURL(file);

      await setBlocks((prevBlcoks) => {
        const newBlocks = [...prevBlcoks];
        (newBlocks[blockIndex] as ImageBlockProps).data.file = file;
        return newBlocks;
      });

      (await waitForElement(`caption-${block.id}`))?.focus();
      refs.current[blockIndex].focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      handleBlockNavigation(e);
    };

    return (
      <BlockContainer>
        <BlockContent>
          <input
            id={block.id}
            hidden
            ref={uploadImageRef}
            type="file"
            name="imageToUpload"
            accept="image/png,image/gif,image/jpeg"
            onChange={handleUploadImage}
          />

          {imagePreview ? (
            <S.ImagePreviewContainer
              ref={(el: HTMLDivElement) => (refs.current[blockIndex] = el)}
            >
              <S.ImagePreview
                style={{ maxWidth: '100%' }}
                src={imagePreview as string}
                alt={`caption-${block.id}`}
              />
              <S.CaptionInputBox
                id={`caption-${block.id}`}
                onKeyDown={handleKeyDown}
                contentEditable
                data-placeholder="Caption..."
              />
            </S.ImagePreviewContainer>
          ) : (
            <S.UploadImageButton
              ref={(el: HTMLParagraphElement) =>
                (refs.current[blockIndex] = el)
              }
              onClick={handleOpenUploadImage}
              onKeyDown={handleKeyDown}
              data-placeholder="👉 Select image"
              tabIndex={1}
              noMargin
              forwardedAs="button"
            />
          )}
        </BlockContent>
      </BlockContainer>
    );
  }
);
