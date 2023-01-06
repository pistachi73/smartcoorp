import React, { FC } from 'react';

import { ListBlockProps } from '../../post-editor.types';
import { BlockContainer } from '../block-container';

import { ListBlockContent } from './list-block-content';

export type ListContainerProps = {
  blockIndex: number;
  block: ListBlockProps;
};

export const ListBlock = React.memo<ListContainerProps>(
  ({ blockIndex, block }) => {
    return (
      <BlockContainer blockIndex={blockIndex} blockType="list">
        <ListBlockContent blockIndex={blockIndex} block={block} />
      </BlockContainer>
    );
  }
);
