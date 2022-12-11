import { FC } from 'react';

import { ImageBlockProps } from '../../post-editor.types';
import { BlockContainer } from '../block-container';

import { ImageBlockContent } from './image-block-content';

export const ImageBlock: FC<{
  blockIndex: number;
  block: ImageBlockProps;
}> = ({ blockIndex, block }) => {
  return (
    <BlockContainer blockIndex={blockIndex} blockType="image">
      <ImageBlockContent blockIndex={blockIndex} block={block} />
    </BlockContainer>
  );
};
