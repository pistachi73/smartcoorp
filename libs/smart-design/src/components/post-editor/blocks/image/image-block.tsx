import React, { FC } from 'react';

import { ImageBlockProps } from '../../post-editor.types';
import { BlockContainer } from '../block-container';

import { ImageBlockContent } from './image-block-content';

export type ImageContainerProps = {
  blockIndex: number;
  block: ImageBlockProps;
};

export const ImageBlock = React.memo<ImageContainerProps>(
  ({ blockIndex, block }) => {
    return (
      <BlockContainer blockIndex={blockIndex} blockType="image">
        <ImageBlockContent blockIndex={blockIndex} block={block} />
      </BlockContainer>
    );
  }
);
