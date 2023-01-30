import React from 'react';

import { Button } from '../../button/button';
import {
  useBlocksDBConsumerContext,
  useBlocksDBUpdaterContext,
} from '../contexts/blocks-db-context/blocks-db-context';

import { Column } from './columns/column-block';
import { HeaderBlock } from './header/header-block';
import { ImageBlock } from './image/image-block';
import { LinkBlock } from './link/link-block';
import { ListBlock } from './list/list-block';
import { ParagraphBlock } from './paragraph/paragraph-block';

export const BlockChain = React.memo(({ chainId }: { chainId: string }) => {
  const blocksDB = useBlocksDBConsumerContext();

  const dispatch = useBlocksDBUpdaterContext();

  const chain = blocksDB.chains[chainId];
  let blockIndex = -1;

  const renderBlockChain = (chain: string[], chainId: string) => (
    <div data-chain={chainId}>
      {chain.map((blockId, chainBlockIndex) => {
        const block = blocksDB.blocks[blockId];
        const blockType = block.type;
        blockIndex += blockType !== 'two-column' ? 1 : 0;

        switch (blockType) {
          case 'header':
            return (
              <HeaderBlock
                key={block.id}
                blockIndex={blockIndex}
                chainBlockIndex={chainBlockIndex}
                chainId={chainId}
                block={block}
              />
            );
          case 'paragraph':
            return (
              <ParagraphBlock
                key={block.id}
                blockIndex={blockIndex}
                chainBlockIndex={chainBlockIndex}
                chainId={chainId}
                block={block}
              />
            );
          case 'list':
            return (
              <ListBlock
                key={block.id}
                blockIndex={blockIndex}
                chainBlockIndex={chainBlockIndex}
                chainId={chainId}
                block={block}
              />
            );

          case 'image':
            return (
              <ImageBlock
                key={block.id}
                blockIndex={blockIndex}
                chainBlockIndex={chainBlockIndex}
                chainId={chainId}
                block={block}
              />
            );
          case 'link':
            return (
              <LinkBlock
                key={block.id}
                blockIndex={blockIndex}
                chainBlockIndex={chainBlockIndex}
                chainId={chainId}
                block={block}
                getMetaData={null}
              />
            );
          case 'two-column': {
            const chains = block.data.chains.map(
              (chainId) => blocksDB.chains[chainId]
            );
            return (
              <Column columns={chains.length} chains={chains}>
                {chains.map((chain, i) => {
                  return renderBlockChain(chain, block.data.chains[i]);
                })}
              </Column>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );

  return (
    <div>
      <Button
        onClick={() => {
          if (blocksDB.canUndo) {
            console.log('undo');
            dispatch({ type: 'UNDO' });
          } else {
            console.log('cannot undo');
          }
        }}
      >
        undo
      </Button>
      <Button
        onClick={() => {
          if (blocksDB.canRedo) {
            console.log('redo');
            dispatch({ type: 'REDO' });
          } else {
            console.log('cannot redo');
          }
        }}
      >
        redo
      </Button>
      <Button
        onClick={() => {
          console.log(blocksDB);
        }}
      >
        log blocks
      </Button>
      {renderBlockChain(chain, chainId)}
    </div>
  );
});
