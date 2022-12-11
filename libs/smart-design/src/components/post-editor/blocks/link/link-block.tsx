import { FC } from 'react';

import { LinkBlockProps } from '../../post-editor.types';
import { BlockContainer } from '../block-container';

import { LinkBlockContent } from './link-block-content';

export const LinkBlock: FC<{
  blockIndex: number;
  block: LinkBlockProps;
  getMetaData: any;
}> = ({ blockIndex, block, getMetaData }) => {
  return (
    <BlockContainer blockIndex={blockIndex} blockType="link">
      <LinkBlockContent
        blockIndex={blockIndex}
        block={block}
        getMetaData={getMetaData}
      />
    </BlockContainer>
  );
};
