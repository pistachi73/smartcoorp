import { z } from 'zod';

import { FlattenUnion, KeysOfUnion } from '@smartcoorp/smart-types';

import { ImageWithUrl, ImagesToHandle } from './contexts/blocks-context';
import type { BlocksDB } from './contexts/blocks-context/blocks-context.types';

type SharedBlockProps = {
  id: string;
  chainId: string;
};

export type BlockType = Block['type'];

const HeaderBlockSchema = z.object({
  type: z.literal('header'),
  data: z.object({
    text: z.string(),
    level: z.number().min(1).max(6),
  }),
});

const ParagraphBlockSchema = z.object({
  type: z.literal('paragraph'),
  data: z.object({
    text: z.string(),
  }),
});

const BlockSchema = z.union([HeaderBlockSchema, ParagraphBlockSchema]);

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

export type ColumnBlock = SharedBlockProps & {
  type: 'columns';
  data: {
    chains: string[];
    distribution?: number[];
  };
};

export type Block =
  | HeaderBlockProps
  | ParagraphBlockProps
  | LinkBlockProps
  | ListBlockProps
  | ImageBlockProps
  | ColumnBlock;

export type BlockByType<T extends BlockType> = Extract<Block, { type: T }>;

export type BlockFieldKeys<T extends BlockType> = KeysOfUnion<
  BlockByType<T>['data']
>;

export type BlockFieldType<
  T extends BlockType,
  F extends BlockFieldKeys<T>
> = BlockByType<T>['data'][F];

export type EveryBlockFieldKeys = KeysOfUnion<Block['data']>;

export type BlockFields<T extends BlockType> = BlockByType<T>['data'];
export type EveryBlockFields = Partial<
  FlattenUnion<Pick<Block, 'data'>['data']>
>;

export type PostEditorProps = {
  blocksDB: BlocksDB;
  setBlocksDB: any;
  getMetaData?: Promise<Function> | any;
  /** Time for the debounce changes */
  debounceTime?: number;
  currentUploadedImages?: ImageWithUrl[];
  setImagesToHandle?: (imagesToHandle: ImagesToHandle) => void;
};
