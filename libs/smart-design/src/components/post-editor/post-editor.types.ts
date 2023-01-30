import { FlattenUnion, KeysOfUnion } from '@smartcoorp/smart-types';

import type { BlocksDB } from './contexts/blocks-db-context/blocks-db.types';

type SharedBlockProps = {
  id: string;
  chainId: string;
};

export type BlockType = 'image' | 'paragraph' | 'link' | 'header' | 'list';

export type HeaderBlockProps = SharedBlockProps & {
  type: 'header';
  data: {
    text: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
  };
};

export type ParagraphBlockProps = SharedBlockProps & {
  type: 'paragraph';
  data: {
    text: string;
  };
};

export type ListBlockProps = SharedBlockProps & {
  type: 'list';
  data: {
    style: 'unordered' | 'ordered';
    items: string[];
  };
};

export type ImageBlockProps = SharedBlockProps & {
  type: 'image';
  data: {
    file?: File;
    url?: string;
    caption?: string;
    alt?: string;
  };
};

export type LinkBlockProps = SharedBlockProps & {
  type: 'link';
  data: {
    link?: string;
    url?: string;
    domain?: string;
    title?: string;
    description?: string;
    imageUrl?: string;
  };
};

export type TwoColumnBlock = SharedBlockProps & {
  type: 'two-column';
  data: {
    chains: [string, string];
  };
};

export type Block =
  | HeaderBlockProps
  | ParagraphBlockProps
  | LinkBlockProps
  | ListBlockProps
  | ImageBlockProps
  | TwoColumnBlock;

export type BlockByType<T extends BlockType> = Extract<Block, { type: T }>;

export type BlockFieldKeys<T extends BlockType> = KeysOfUnion<
  BlockByType<T>['data']
>;
export type EveryBlockFieldKeys = KeysOfUnion<Block['data']>;

export type BlockFields<T extends BlockType> = BlockByType<T>['data'];
export type EveryBlockFields = Partial<
  FlattenUnion<Pick<Block, 'data'>['data']>
>;

export type PostEditorProps = {
  blocksDB: BlocksDB;
  setBlocksDB: any;
  getMetaData?: Promise<Function> | any;
};
