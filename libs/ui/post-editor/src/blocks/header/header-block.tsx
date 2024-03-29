import React from 'react';

import { BlockContainer } from '../block-container';
import { HeaderBlockContainerProps } from '../blocks.types';

import { HeaderBlockContent } from './header-block-content';

export const HeaderBlock = React.memo<HeaderBlockContainerProps>(
  ({ blockIndex, chainBlockIndex, chainId, block, chainLength }) => {
    return (
      <BlockContainer
        blockIndex={blockIndex}
        chainBlockIndex={chainBlockIndex}
        blockId={block.id}
        chainId={chainId}
        chainLength={chainLength}
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
