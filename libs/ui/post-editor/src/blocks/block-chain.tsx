import React from 'react';

import { Button } from '@smartcoorp/ui/button';

import {
  useBlocksDBConsumerContext,
  useBlocksDBUpdaterContext,
} from '../contexts/blocks-context/blocks-context';
import { useRefsContext } from '../contexts/refs-context';
import type { Block } from '../post-editor.types';

import { Column } from './columns/column-block';
import { HeaderBlock } from './header/header-block';
import { ImageBlock } from './image/image-block';
import { LinkBlock } from './link/link-block';
import { ListBlock } from './list/list-block';
import { ParagraphBlock } from './paragraph/paragraph-block';

export const BlockChain = React.memo(
  ({ chainId, getMetaData }: { chainId: string; getMetaData: any }) => {
    const blocksDB = useBlocksDBConsumerContext();

    const { fieldRefs } = useRefsContext();
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
            blockIndex,
            chainBlockIndex,
            chainId,
            chainLength: chain.length,
            chainLevel,
            parentChainId,
          };

          switch (blockType) {
            case 'header':
              return (
                <HeaderBlock key={block.id} {...sharedProps} block={block} />
              );
            case 'paragraph':
              return (
                <ParagraphBlock key={block.id} {...sharedProps} block={block} />
              );
            case 'list':
              return (
                <ListBlock key={block.id} {...sharedProps} block={block} />
              );
            case 'image':
              return (
                <ImageBlock key={block.id} {...sharedProps} block={block} />
              );
            case 'link':
              return (
                <LinkBlock
                  key={block.id}
                  {...sharedProps}
                  block={block}
                  getMetaData={getMetaData}
                />
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
      <div
        style={{
          marginLeft: '-48px',
        }}
      >
        <Button onClick={() => console.log(blocksDB)}>Log blocks</Button>
        <Button onClick={() => console.log(fieldRefs.current)}>
          Field Refs
        </Button>
        {chain ? renderBlockChain(chain, chainId, 0, 'root') : null}
      </div>
    );
  }
);
