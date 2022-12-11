import { FC } from 'react';

import { ListBlockProps } from '../../post-editor.types';
import { BlockContainer } from '../block-container';

import { ListBlockContent } from './list-block-content';

export const ListBlock: FC<{
  blockIndex: number;
  block: ListBlockProps;
}> = ({ blockIndex, block }) => {
  return (
    <BlockContainer blockIndex={blockIndex} blockType="list">
      <ListBlockContent
        blockIndex={blockIndex}
        block={block}
        style={block.data.style}
      />
    </BlockContainer>
  );
};
