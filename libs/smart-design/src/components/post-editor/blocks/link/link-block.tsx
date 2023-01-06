import React, { FC } from 'react';

import { LinkBlockProps } from '../../post-editor.types';
import { BlockContainer } from '../block-container';

import { LinkBlockContent } from './link-block-content';

export type LinkContainerProps = {
  blockIndex: number;
  block: LinkBlockProps;
  getMetaData: any;
};

export const LinkBlock = React.memo<LinkContainerProps>(
  ({ blockIndex, block, getMetaData }) => {
    return (
      <BlockContainer blockIndex={blockIndex} blockType="link">
        <LinkBlockContent
          blockIndex={blockIndex}
          block={block}
          getMetaData={getMetaData}
        />
      </BlockContainer>
    );
  }
);
