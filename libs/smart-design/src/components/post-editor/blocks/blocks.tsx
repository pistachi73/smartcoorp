import { Button } from '../../button';
import { useBlocks } from '../contexts/block-context';
import { useDragSelection, useRefs, useSharedEvents } from '../hooks';

import { HeaderBlock } from './header/header-block';
import { ImageBlock } from './image/image-block';
import { LinkBlock } from './link/link-block';
import { ListBlock } from './list/list-block';
import { ParagraphBlock } from './paragraph/paragraph-block';

export const Blocks = ({ getMetaData }: { getMetaData: any }) => {
  const { blocks } = useBlocks();
  const { refs } = useRefs();
  const { DragSelection } = useDragSelection();
  const { handleSharedClickDown, handleSharedKeyDown } = useSharedEvents();

  return (
    <div onMouseDown={handleSharedClickDown} onKeyDown={handleSharedKeyDown}>
      <Button
        onClick={() => {
          console.log(blocks);
          console.log(refs);
          refs.current[3].focus();
        }}
      >
        Log blocks
      </Button>
      <DragSelection />
      {blocks.map((block, index) => {
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
            return (
              <ListBlock key={block.id} blockIndex={index} block={block} />
            );
          case 'image':
            return (
              <ImageBlock key={block.id} blockIndex={index} block={block} />
            );

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
      })}
    </div>
  );
};
