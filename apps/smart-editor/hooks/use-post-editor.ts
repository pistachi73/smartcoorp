import { createPresignedUrl } from '@smart-editor/actions/create-presigned-url';
import { deleteFile } from '@smart-editor/actions/delete-file';
import {
  getFileExtension,
  uploadToS3,
} from '@smart-editor/actions/upload-to-s3';
import { useCallback, useState } from 'react';

import {
  Block,
  BlocksDB,
  ImageBlockProps,
  ImageWithUrl,
  ImagesToHandle,
} from '@smartcoorp/ui/post-editor';

type Input = {
  userId: string | number;
  postId: string | number;
  initialBlocks?: BlocksDB | any;
};

type Output = {
  postBlocks: BlocksDB;
  currentUploadedImages: ImageWithUrl[];
  setPostBlocks: (blocks: BlocksDB) => void;
  setImagesToHandle: (imagesToHandle: ImagesToHandle) => void;
  handleImages: () => Promise<BlocksDB>;
  getWordCount: () => number;
};

const isImageBlock = (block: Block): block is ImageBlockProps =>
  block.type === 'image';

const getInitialUploadedImages = (
  blocks: BlocksDB['blocks']
): ImageWithUrl[] => {
  const initialUploadedImages = new Map<string, string>();

  const blockIds = Object.keys(blocks);
  for (const id of blockIds) {
    const block = blocks[id];

    if (block.type !== 'image') continue;

    const { url = undefined } = block.data;

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

export const defaultBlobPostContent: BlocksDB = {
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

export const usePostEditor = ({
  postId,
  initialBlocks,
  userId,
}: Input): Output => {
  const [postBlocks, setPostBlocks] = useState<BlocksDB>(
    initialBlocks ?? defaultBlobPostContent
  );
  const [currentUploadedImages, setCurrentUploadedImages] = useState<
    ImageWithUrl[]
  >(getInitialUploadedImages(initialBlocks?.blocks ?? defaultBlobPostContent));

  const [imagesToHandle, setImagesToHandle] = useState<ImagesToHandle>({
    toUpload: [],
    toDelete: [],
  });

  const handleImages = async () => {
    const newPostBlocks = JSON.parse(JSON.stringify(postBlocks));

    const newImagesUploadedUrls = new Map<string, string>();
    const newImagesDeletedUrls = new Set<string>();

    // UPLOAD IMAGES
    await Promise.all(
      imagesToHandle.toUpload.map(async ({ image, blockId }) => {
        if (!isImageBlock(newPostBlocks.blocks[blockId])) return;

        try {
          const imageUrl = await uploadToS3({
            getPresignedUrl: () =>
              createPresignedUrl({
                folder: `${userId}/${postId}`,
                fileExtension: getFileExtension(image),
                fileName: blockId,
              }),
            file: image,
          });

          newImagesUploadedUrls.set(blockId, imageUrl);
          (newPostBlocks.blocks[blockId] as ImageBlockProps).data.url =
            imageUrl;
          delete (newPostBlocks.blocks[blockId] as ImageBlockProps).data.file;
        } catch (e) {
          console.log(`Image with id ${blockId} could not be uploaded`, e);
        }
      })
    );

    // DELETE IMAGES
    await Promise.all(
      imagesToHandle.toDelete.map(async ({ imageUrl }) => {
        try {
          await deleteFile({
            fileUrl: imageUrl,
            folder: `${userId}/${postId}`,
          });
          newImagesDeletedUrls.add(imageUrl);
        } catch (e) {
          console.log(`Image with url ${imageUrl} could not be deleted`);
        }
      })
    );

    //RESET CURRENT UPLOADED IMAGES
    setCurrentUploadedImages((acc) => [
      ...[...acc].filter(({ imageUrl }) => !newImagesDeletedUrls.has(imageUrl)),
      ...Array.from(newImagesUploadedUrls.entries()).map(
        ([blockId, imageUrl]) => ({ blockId, imageUrl })
      ),
    ]);

    // RESET IMAGES TO HANDLE
    setImagesToHandle({
      toUpload: [],
      toDelete: [],
    });

    // RESET BLOCKS
    setPostBlocks(newPostBlocks);

    return newPostBlocks;
  };

  const getWordCount = useCallback(() => {
    const blockIds = Object.keys(postBlocks.blocks);
    let wordCount = 0;
    for (const id of blockIds) {
      const block = postBlocks.blocks[id];

      if (block.type === 'header') {
        wordCount += getWordCountFromHTML(block.data.text);
      }

      if (block.type === 'paragraph') {
        wordCount += getWordCountFromHTML(block.data.text);
      }

      if (block.type === 'list') {
        block.data.items.forEach((item) => {
          wordCount += getWordCountFromHTML(item);
        });
      }
    }

    return wordCount;
  }, [postBlocks.blocks]);

  return {
    postBlocks,
    setPostBlocks,
    setImagesToHandle,
    currentUploadedImages,
    handleImages,
    getWordCount,
  };
};
