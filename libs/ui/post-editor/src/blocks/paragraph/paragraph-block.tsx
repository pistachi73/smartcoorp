import React from 'react';

import { BlockContainer } from '../block-container';
import { ParagraphBlockContainerProps } from '../blocks.types';

import { ParagraphBlockContent } from './paragraph-block-content';

export const ParagraphBlock = React.memo<ParagraphBlockContainerProps>(
  ({ blockIndex, chainBlockIndex, chainId, block, chainLength }) => {
    return (
      <BlockContainer
        blockIndex={blockIndex}
        chainBlockIndex={chainBlockIndex}
        blockId={block.id}
        chainId={chainId}
        chainLength={chainLength}
        blockType="paragraph"
      >
        <ParagraphBlockContent
          blockIndex={blockIndex}
          chainBlockIndex={chainBlockIndex}
          chainId={chainId}
          block={block}
        />
      </BlockContainer>
    );
  }
);
