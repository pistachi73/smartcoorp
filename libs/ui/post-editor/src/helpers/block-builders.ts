import {
  ColumnBlock,
  HeaderBlockProps,
  ImageBlockProps,
  LinkBlockProps,
  ListBlockProps,
  ParagraphBlockProps,
} from '../post-editor.types';

import { nanoid } from './nanoid';

export const buildParagraphBlock = (
  chainId: string,
  text = ''
): ParagraphBlockProps => ({
  id: nanoid(),
  chainId,
  type: 'paragraph',
  data: {
    text,
  },
});

export const buildImageBlock = (chainId: string): ImageBlockProps => ({
  id: nanoid(),
  chainId,
  type: 'image',
  data: {},
});

export const buildLinkBlock = (chainId: string): LinkBlockProps => ({
  id: nanoid(),
  chainId,
  type: 'link',
  data: {},
});

export const buildListBlock = (
  chainId: string,
  items: string[] = ['<br>'],
  style: 'unordered' | 'ordered' = 'unordered'
): ListBlockProps => ({
  id: nanoid(),
  chainId,
  type: 'list',
  data: {
    style,
    items,
  },
});

export const buildHeaderBlock = (
  chainId: string,
  text = ''
): HeaderBlockProps => ({
  id: nanoid(),
  chainId,
  type: 'header',
  data: {
    level: 3,
    text,
  },
});

export const buildColumnsBlock = (
  chainId: string,
  columns: 2 | 3
): ColumnBlock => {
  const blockId = nanoid();
  return {
    id: blockId,
    chainId,
    type: 'columns',
    data: {
      chains: Array(columns)
        .fill(0)
        .map(() => `${blockId}-${nanoid()}`),
    },
  };
};
