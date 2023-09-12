import { memo, useCallback, useEffect, useState } from 'react';

import { useBlocksDBUpdaterContext } from '../../contexts/blocks-context';
import { useRefsContext } from '../../contexts/refs-context/refs-context';
import { FileField } from '../../fields/file-field';
import { waitForElement } from '../../helpers/wait-for-element';
import type { ImageBlockContentProps } from '../blocks.types';

import * as S from './image-block.styles';
import { ImageCaption } from './image-caption';

export const ImageBlockContent = memo<ImageBlockContentProps>(
  ({ blockIndex, block }) => {
    const { setFieldValue } = useBlocksDBUpdaterContext();
    const { setPrevCaretPosition } = useRefsContext();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const captionFieldId = `${block.id}_0`;

    useEffect(() => {
      if (imagePreview) return;
      if (block.data.file instanceof File) {
        setImagePreview(URL.createObjectURL(block.data.file));
      } else if (block.data.url) {
        setImagePreview(block.data.url);
      } else setImagePreview(null);
    }, [block, imagePreview]);

    const handleUploadImage = useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setFieldValue({
          blockType: 'image',
          blockId: block.id,
          field: 'file',
          value: file,
        });

        (await waitForElement(captionFieldId))?.focus();
        setPrevCaretPosition(0);
      },
      [block.id, captionFieldId, setFieldValue, setPrevCaretPosition]
    );

    return imagePreview ? (
      <S.ImagePreviewContainer>
        <S.ImagePreview
          style={{ maxWidth: '100%' }}
          src={imagePreview as string}
          alt={`caption-${block.id}`}
        />
        <ImageCaption
          blockId={block.id}
          blockIndex={blockIndex}
          fieldIndex={0}
          caption={block.data.caption || ''}
        />
      </S.ImagePreviewContainer>
    ) : (
      <FileField
        acceptedFileTypes="image/*"
        blockId={block.id}
        blockIndex={blockIndex}
        fieldIndex={0}
        placeholder="👉 Select file"
        name="imageToUpload"
        handleUploadFile={handleUploadImage}
      />
    );
  }
);
