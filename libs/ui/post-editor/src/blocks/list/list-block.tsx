import React from 'react';

import { BlockContainer } from '../block-container';
import { ListBlockContainerProps } from '../blocks.types';

import { ListBlockContent } from './list-block-content';

export const ListBlock = React.memo<ListBlockContainerProps>(
  ({
    blockIndex,
    chainBlockIndex,
    chainId,
    chainLevel,
    block,
    chainLength,
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
        blockType="list"
      >
        <ListBlockContent
          blockIndex={blockIndex}
          chainBlockIndex={chainBlockIndex}
          chainId={chainId}
          block={block}
        />
      </BlockContainer>
    );
  }
);
