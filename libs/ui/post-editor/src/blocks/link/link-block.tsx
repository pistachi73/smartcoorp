import React from 'react';

import { BlockContainer } from '../block-container';
import { LinkBlockContainerProps } from '../blocks.types';

import { LinkBlockContent } from './link-block-content';

export const LinkBlock = React.memo<LinkBlockContainerProps>(
  ({
    blockIndex,
    chainBlockIndex,
    chainId,
    block,
    getMetaData,
    chainLength,
  }) => {
    return (
      <BlockContainer
        blockIndex={blockIndex}
        chainBlockIndex={chainBlockIndex}
        blockId={block.id}
        chainId={chainId}
        chainLength={chainLength}
        blockType="link"
      >
        <LinkBlockContent
          blockIndex={blockIndex}
          chainBlockIndex={chainBlockIndex}
          chainId={chainId}
          block={block}
          getMetaData={getMetaData}
        />
      </BlockContainer>
    );
  }
);
