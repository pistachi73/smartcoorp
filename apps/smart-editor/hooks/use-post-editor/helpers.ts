import {
  Block,
  type BlocksDB,
  ImageBlockProps,
} from '@smartcoorp/ui/post-editor';

import type {
  GetImagesFromBlocksInput,
  GetInitialUploadedImagesInput,
  ImageWithUrl,
  ImagesToHandle,
} from './use-post-editor.types';

export const defaultBlogPostContent: BlocksDB = {
  blocks: {
    '0': {
      id: '0',
      chainId: 'main',
      type: 'header',
      data: {
        level: 3,
        text: 'Write your blog',
      },
    },
  },
  chains: {
    main: ['0'],
  },
};

export const getImagesFromBlocks = ({
  blocks,
  currentUploadedImages,
}: GetImagesFromBlocksInput): ImagesToHandle => {
  const imageBlockIds = new Set<string>();
  const toUpload = new Map<string, File>();
  const toDelete = new Map<string, string>();

  const blockIds = Object.keys(blocks);

  for (const id of blockIds) {
    const block = blocks[id];

    if (block.type !== 'image') {
      continue;
    }

    imageBlockIds.add(block.id);

    if (currentUploadedImages.some(({ blockId }) => blockId === block.id)) {
      continue;
    }

    console.log('Hola');

    const { file } = block.data;

    if (file instanceof File) {
      console.log('file', file);
      toUpload.set(block.id, file);
    }
  }

  for (const { blockId, imageUrl } of currentUploadedImages) {
    if (!imageBlockIds.has(blockId)) {
      toDelete.set(blockId, imageUrl);
    }
  }

  return {
    toUpload: Array.from(toUpload.entries()).map(([key, value]) => ({
      blockId: key,
      image: value,
    })),
    toDelete: Array.from(toDelete.entries()).map(([key, value]) => ({
      blockId: key,
      imageUrl: value,
    })),
  };
};

export const getInitialUploadedImages = ({
  blocks,
}: GetInitialUploadedImagesInput): ImageWithUrl[] => {
  const initialUploadedImages = new Map<string, string>();

  const blockIds = Object.keys(blocks);
  for (const id of blockIds) {
    const block = blocks[id];

    if (block.type !== 'image') {
      continue;
    }

    const { url } = block.data;

    if (url) {
      initialUploadedImages.set(block.id, url);
    }
  }

  return Array.from(initialUploadedImages.entries()).map(([key, value]) => ({
    blockId: key,
    imageUrl: value,
  }));
};

const getWordCountFromHTML = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .split(' ')
    .filter((n) => n != '').length;

export const getWordCount = (blocks: BlocksDB['blocks']): number => {
  const blockIds = Object.keys(blocks);
  let wordCount = 0;
  for (const id of blockIds) {
    const block = blocks[id];

    if (block.type === 'header' || block.type === 'paragraph') {
      wordCount += getWordCountFromHTML(block.data.text);
    }

    if (block.type === 'list') {
      block.data.items.forEach((item) => {
        wordCount += getWordCountFromHTML(item);
      });
    }
  }

  return wordCount;
};

export const isImageBlock = (block: Block): block is ImageBlockProps =>
  block.type === 'image';
