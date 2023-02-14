import React from 'react';

import { Button } from '../../button/button';
import {
  useBlocksDBConsumerContext,
  useBlocksDBUpdaterContext,
} from '../contexts/blocks-context/blocks-context';
import type { Block } from '../post-editor.types';

import { Column } from './columns/column-block';
import { HeaderBlock } from './header/header-block';
import { ImageBlock } from './image/image-block';
import { LinkBlock } from './link/link-block';
import { ListBlock } from './list/list-block';
import { ParagraphBlock } from './paragraph/paragraph-block';

export const BlockChain = React.memo(({ chainId }: { chainId: string }) => {
  const blocksDB = useBlocksDBConsumerContext();

  const { undo, redo } = useBlocksDBUpdaterContext();

  const chain = blocksDB.chains[chainId];
  let blockIndex = -1;

  const renderBlockChain = (
    chain: string[],
    chainId: string,
    chainLevel: number,
    parentChainId: string
  ) => (
    <div key={chainId} data-chain={chainId}>
      {chain.map((blockId, chainBlockIndex) => {
        const block: Block = blocksDB.blocks[blockId];
        const blockType = block.type;
        blockIndex += blockType !== 'columns' ? 1 : 0;

        const sharedProps = {
          key: block.id,
          blockIndex,
          chainBlockIndex,
          chainId,
          chainLength: chain.length,
          chainLevel,
          parentChainId,
        };

        switch (blockType) {
          case 'header':
            return <HeaderBlock {...sharedProps} block={block} />;
          case 'paragraph':
            return <ParagraphBlock {...sharedProps} block={block} />;
          case 'list':
            return <ListBlock {...sharedProps} block={block} />;
          case 'image':
            return <ImageBlock {...sharedProps} block={block} />;
          case 'link':
            return (
              <LinkBlock {...sharedProps} block={block} getMetaData={null} />
            );
          case 'columns': {
            const chains = block.data.chains.map(
              (chainId) => blocksDB.chains[chainId]
            );
            return (
              <Column key={block.id} columns={chains.length} chains={chains}>
                {chains.map((chain, i) => {
                  return renderBlockChain(
                    chain,
                    block.data.chains[i],
                    chainLevel + 1,
                    chainId
                  );
                })}
              </Column>
            );
          }
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
            undo();
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
            redo();
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
      <div
        style={{
          marginLeft: '-48px',
        }}
      >
        {renderBlockChain(chain, chainId, 0, 'root')}
      </div>
    </div>
  );
});
