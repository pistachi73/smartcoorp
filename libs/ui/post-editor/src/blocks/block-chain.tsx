import React from 'react';

import { useBlocksDBConsumerContext } from '../contexts/blocks-context/blocks-context';
import { StyledBlockChainContainer } from '../post-editor.styles';
import type { Block } from '../post-editor.types';

import { Column } from './columns/column-block';
import { HeaderBlock } from './header/header-block';
import { ImageBlock } from './image/image-block';
import { LinkBlock } from './link/link-block';
import { ListBlock } from './list/list-block';
import { ParagraphBlock } from './paragraph/paragraph-block';

const BlockChainContainer = ({
  chainId,
  children,
}: {
  chainId: string;
  children: React.ReactNode;
}) => {
  return (
    <StyledBlockChainContainer key={chainId} data-chain={chainId}>
      {children}
    </StyledBlockChainContainer>
  );
};

export const BlockChain = React.memo(
  ({ chainId, getMetaData }: { chainId: string; getMetaData: any }) => {
    const blocksDB = useBlocksDBConsumerContext();

    const chain = blocksDB.chains[chainId];
    let blockIndex = -1;

    const renderBlockChain = (chain: string[], chainId: string) => {
      return (
        <BlockChainContainer key={chainId} chainId={chainId}>
          {chain.map((blockId, chainBlockIndex) => {
            const block: Block = blocksDB.blocks[blockId];
            const blockType = block.type;
            blockIndex += blockType !== 'columns' ? 1 : 0;

            const sharedProps = {
              blockIndex,
              chainBlockIndex,
              chainId,
              chainLength: chain.length,
            };

            switch (blockType) {
              case 'header':
                return (
                  <HeaderBlock key={block.id} {...sharedProps} block={block} />
                );
              case 'paragraph':
                return (
                  <ParagraphBlock
                    key={block.id}
                    {...sharedProps}
                    block={block}
                  />
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
                  <Column
                    key={block.id}
                    blockId={block.id}
                    columns={chains.length as 2 | 3}
                    distribution={block.data.distribution}
                  >
                    {chains.map((chain, i) => {
                      return renderBlockChain(chain, block.data.chains[i]);
                    })}
                  </Column>
                );
              }
            }
          })}
        </BlockChainContainer>
      );
    };

    return <div>{chain ? renderBlockChain(chain, chainId) : null}</div>;
  }
);
