import { getFileExtension, uploadFileToS3 } from '@smart-admin/media';
import { useCallback, useState } from 'react';

import {
  Block,
  BlocksDB,
  ImageBlockProps,
  ImageWithUrl,
  ImagesToHandle,
} from '@smartcoorp/ui/post-editor';

import { clientTRPC } from '../utils/trpc/client-api';

type Input = {
  blogPostId: string;
};

type Output = {
  postBlocks: BlocksDB;
  currentUploadedImages: ImageWithUrl[];
  setPostBlocks: (blocks: BlocksDB) => void;
  setImagesToHandle: (imagesToHandle: ImagesToHandle) => void;
  handleImages: () => Promise<BlocksDB>;
  setInitialUploadedImages: (blocks: BlocksDB['blocks']) => void;
};

const BUCKET_FOLDER = 'blog-post-images';

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

export const usePostEditor = ({ blogPostId }: Input): Output => {
  const [postBlocks, setPostBlocks] = useState<BlocksDB>(
    defaultBlobPostContent
  );
  const [currentUploadedImages, setCurrentUploadedImages] = useState<
    ImageWithUrl[]
  >([]);

  const [imagesToHandle, setImagesToHandle] = useState<ImagesToHandle>({
    toUpload: [],
    toDelete: [],
  });

  const createPresignedUrl = clientTRPC.media.createPresignedUrl.useMutation();
  const deleteFile = clientTRPC.media.deleteFile.useMutation();

  const handleImages = async () => {
    const newPostBlocks = JSON.parse(JSON.stringify(postBlocks));

    const newImagesUploadedUrls = new Map<string, string>();
    const newImagesDeletedUrls = new Set<string>();

    // UPLOAD IMAGES
    await Promise.all(
      imagesToHandle.toUpload.map(async ({ image, blockId }) => {
        if (!isImageBlock(newPostBlocks.blocks[blockId])) return;

        try {
          const imageUrl = await uploadFileToS3({
            getPresignedUrl: () =>
              createPresignedUrl.mutateAsync({
                folder: `${BUCKET_FOLDER}/${blogPostId}`,
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
          await deleteFile.mutateAsync({
            fileUrl: imageUrl,
            folder: `${BUCKET_FOLDER}/${blogPostId}`,
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

  const setInitialUploadedImages = useCallback((blocks: BlocksDB['blocks']) => {
    setCurrentUploadedImages(getInitialUploadedImages(blocks));
  }, []);

  return {
    postBlocks,
    setPostBlocks,
    setImagesToHandle,
    currentUploadedImages,
    handleImages,
    setInitialUploadedImages,
  };
};
