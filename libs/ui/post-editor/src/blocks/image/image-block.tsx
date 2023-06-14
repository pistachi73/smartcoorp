import React from 'react';

import { BlockContainer } from '../block-container';
import { ImageBlockContainerProps } from '../blocks.types';

import { ImageBlockContent } from './image-block-content';

export const ImageBlock = React.memo<ImageBlockContainerProps>(
  ({
    blockIndex,
    chainBlockIndex,
    chainId,
    block,
    chainLength,
    chainLevel,
    parentChainId,
  }) => {
    return (
      <BlockContainer
        blockIndex={blockIndex}
        chainBlockIndex={chainBlockIndex}
        blockId={block.id}
        chainId={chainId}
        chainLevel={chainLevel}
        chainLength={chainLength}
        parentChainId={parentChainId}
        blockType="image"
      >
        <ImageBlockContent
          blockIndex={blockIndex}
          chainBlockIndex={chainBlockIndex}
          chainId={chainId}
          block={block}
        />
      </BlockContainer>
    );
  }
);
