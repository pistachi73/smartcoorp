import update from 'immutability-helper';
import * as R from 'ramda';
import { useMemo } from 'react';

import { Button } from '../../button';
import { useBlocks } from '../contexts/block-context';
import { addIdxToObject, removeIdxFromObject } from '../helpers/fp-helpers';
import { useDragSelection, useRefs, useSharedEvents } from '../hooks';
import { useCommands } from '../hooks/use-commands/use-commands';

import { HeaderBlock, HeaderContainerProps } from './header/header-block';
import { ImageBlock, ImageContainerProps } from './image/image-block';
import { LinkBlock, LinkContainerProps } from './link/link-block';
import { ListBlock, ListContainerProps } from './list/list-block';
import {
  ParagraphBlock,
  ParagraphContainerProps,
} from './paragraph/paragraph-block';

export const Blocks = ({ getMetaData }: { getMetaData: any }) => {
  const { blocks } = useBlocks();
  const { refs, blockRefs, focusableRefs, flatenFocusableRefs } = useRefs();
  const { DragSelection } = useDragSelection();
  const { handleSharedClickDown, handleSharedKeyDown } = useSharedEvents();
  const { commands } = useCommands();

  const renderBlocks = useMemo(() => {
    return blocks.map((block, index) => {
      switch (block.type) {
        case 'header':
          return (
            <HeaderBlock key={block.id} blockIndex={index} block={block} />
          );
        case 'paragraph':
          return (
            <ParagraphBlock key={block.id} blockIndex={index} block={block} />
          );
        case 'list':
          return <ListBlock key={block.id} blockIndex={index} block={block} />;
        case 'image':
          return <ImageBlock key={block.id} blockIndex={index} block={block} />;

        case 'link':
          return (
            <LinkBlock
              key={block.id}
              blockIndex={index}
              block={block}
              getMetaData={getMetaData}
            />
          );
        default:
          return null;
      }
    });
  }, [blocks, getMetaData]);
  return (
    <div onMouseDown={handleSharedClickDown} onKeyDown={handleSharedKeyDown}>
      <Button
        onClick={() => {
          console.log(blocks);
          console.log(commands.current);
        }}
      >
        Log blocks
      </Button>
      <DragSelection />
      {renderBlocks}
    </div>
  );
};
