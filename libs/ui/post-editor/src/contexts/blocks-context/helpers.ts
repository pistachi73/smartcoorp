import type { BlockDataDB } from './blocks-context.types';

export type ImageWithFile = {
  blockId: string;
  image: File;
};

export type ImageWithUrl = {
  blockId: string;
  imageUrl: string;
};

export type ImagesToHandle = {
  toUpload: ImageWithFile[];
  toDelete: ImageWithUrl[];
};

type GetImagesFromBlocksInput = {
  blocks: BlockDataDB;
  currentUploadedImages: ImageWithUrl[];
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

    if (block.type !== 'image') continue;

    imageBlockIds.add(block.id);

    if (currentUploadedImages.some(({ blockId }) => blockId === block.id))
      continue;

    const { file = undefined } = block.data;

    if (file instanceof File) {
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
