import React from 'react';

import { HeaderBlockProps } from '../../post-editor.types';
import { BlockContainer } from '../block-container';

import { HeaderBlockContent } from './header-block-content';

export type HeaderContainerProps = {
  blockIndex: number;
  block: HeaderBlockProps;
};

export const HeaderBlock = React.memo<HeaderContainerProps>(
  ({ blockIndex, block }) => {
    return (
      <BlockContainer blockIndex={blockIndex} blockType="header">
        <HeaderBlockContent blockIndex={blockIndex} block={block} />
      </BlockContainer>
    );
  },
  (prevState, nextState) =>
    prevState.block.data.text === nextState.block.data.text &&
    prevState.block.data.level === nextState.block.data.level &&
    prevState.blockIndex === nextState.blockIndex
);
