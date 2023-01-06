import React from 'react';

import { ParagraphBlockProps } from '../../post-editor.types';
import { BlockContainer } from '../block-container';

import { ParagraphBlockContent } from './paragraph-block-content';

export type ParagraphContainerProps = {
  blockIndex: number;
  block: ParagraphBlockProps;
};

export const ParagraphBlock = React.memo<ParagraphContainerProps>(
  ({ blockIndex, block }) => {
    return (
      <BlockContainer blockIndex={blockIndex} blockType="paragraph">
        <ParagraphBlockContent blockIndex={blockIndex} block={block} />
      </BlockContainer>
    );
  }
);
