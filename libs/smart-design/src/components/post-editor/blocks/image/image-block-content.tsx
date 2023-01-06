import { memo, useCallback, useRef, useState } from 'react';

import { useBlockUpdaterContext } from '../../contexts/block-context';
import { FileField } from '../../fields/file-field';
import { waitForElement } from '../../helpers/wait-for-element';
import { useRefs } from '../../hooks';
import { ImageBlockProps } from '../../post-editor.types';

import * as S from './image-block.styles';
import { ImageCaption } from './image-caption';

type ImageBlockContentProps = {
  blockIndex: number;
  block: ImageBlockProps;
};

export const ImageBlockContent = memo<ImageBlockContentProps>(({ blockIndex, block }) => {
  const { updateBlockFields } = useBlockUpdaterContext();
  const { refs } = useRefs();
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>();

  const handleUploadImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImagePreview(reader.result);
      });
      reader.readAsDataURL(file);

      updateBlockFields(blockIndex, { file });

      (await waitForElement(`caption-${block.id}`))?.focus();
      refs.current[blockIndex].focus();
    },
    [block.id, blockIndex, refs, updateBlockFields]
  );

  return imagePreview ? (
    <S.ImagePreviewContainer ref={(el: HTMLDivElement) => (refs.current[blockIndex] = el)}>
      <S.ImagePreview
        style={{ maxWidth: '100%' }}
        src={imagePreview as string}
        alt={`caption-${block.id}`}
      />
      <ImageCaption
        blockId={block.id}
        blockIndex={blockIndex}
        focusIndex={0}
        caption={block.data.caption || ''}
      />
    </S.ImagePreviewContainer>
  ) : (
    <FileField
      acceptedFileTypes="image/png,image/gif,image/jpeg"
      blockId={block.id}
      blockIndex={blockIndex}
      focusIndex={0}
      placeholder="👉 Select file"
      name="imageToUpload"
      handleUploadFile={handleUploadImage}
    />
  );
});
