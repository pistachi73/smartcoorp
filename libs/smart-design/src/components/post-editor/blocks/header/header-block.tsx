import { FC } from 'react';

import { HeaderBlockProps } from '../../post-editor.types';
import { BlockContainer } from '../block-container';

import { HeaderBlockContent } from './header-block-content';

export const HeaderBlock: FC<{
  blockIndex: number;
  block: HeaderBlockProps;
}> = ({ blockIndex, block }) => {
  return (
    <BlockContainer blockIndex={blockIndex} blockType="header">
      <HeaderBlockContent
        blockIndex={blockIndex}
        block={block}
        level={block.data.level}
      />
    </BlockContainer>
  );
};
