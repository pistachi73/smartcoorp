import React from 'react';

import { BlockContainer } from '../block-container';
import { HeaderBlockContainerProps } from '../blocks.types';

import { HeaderBlockContent } from './header-block-content';

export const HeaderBlock = React.memo<HeaderBlockContainerProps>(
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
        blockType="header"
      >
        <HeaderBlockContent
          blockIndex={blockIndex}
          chainBlockIndex={chainBlockIndex}
          chainId={chainId}
          block={block}
        />
      </BlockContainer>
    );
  }
);
