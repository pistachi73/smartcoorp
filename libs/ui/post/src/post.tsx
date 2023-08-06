'use client';

import { Block } from 'libs/ui/post-editor/src/post-editor.types';

import { Column } from './components/columns';
import { Header } from './components/header';
import { Image } from './components/image';
import { Link } from './components/link';
import { List } from './components/list';
import { Paragraph } from './components/paragraph';
import { Styled as S } from './post.styles';
import type { PostProps } from './post.types';

export const Post = ({ title, content }: PostProps) => {
  const chain = content?.chains?.['main'];

  const renderBlockChain = (chain: string[]) => (
    <div>
      {chain.map((blockId) => {
        const block: Block = content.blocks[blockId];
        const blockType = block.type;

        switch (blockType) {
          case 'header':
            return <Header key={block.id} {...block} />;
          case 'paragraph':
            return <Paragraph key={block.id} {...block} />;
          case 'list':
            return <List key={block.id} {...block} />;
          case 'image':
            return <Image key={block.id} {...block} />;
          case 'link':
            return <Link key={block.id} {...block} />;
          case 'columns': {
            const chains = block.data.chains.map((chainId) => ({
              chain: content.chains[chainId],
              chainId,
            }));
            return (
              <Column key={block.id} columns={chains.length}>
                {chains.map(({ chain, chainId }, i) => {
                  return <div key={chainId}>{renderBlockChain(chain)}</div>;
                })}
              </Column>
            );
          }
        }
      })}
    </div>
  );

  return (
    <S.PostContainer>{chain ? renderBlockChain(chain) : null}</S.PostContainer>
  );
};
