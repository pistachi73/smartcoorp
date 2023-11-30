import { createPresignedUrl } from '@smart-editor/actions/create-presigned-url';
import { deleteFile } from '@smart-editor/actions/delete-file';
import { uploadToS3 } from '@smart-editor/actions/upload-to-s3';
import { useUpdatePost } from '@smart-editor/components/user-dashboard/posts/posts.hooks';
import { useReducer, useState } from 'react';
import { useAutosave } from 'react-autosave';

import { ImageBlockProps, blocksDBReducer } from '@smartcoorp/ui/post-editor';

import {
  defaultBlogPostContent,
  getImagesFromBlocks,
  getInitialUploadedImages,
  getWordCount,
  isImageBlock,
} from './helpers';
import type {
  ImageWithUrl,
  UsePostEditorInput,
  UsePostEditorOutput,
} from './use-post-editor.types';

export const usePostEditor = ({
  postId,
  userId,
  setSaving,
  saving,
  initialBlocksDb,
  saveInterval = 3000,
}: UsePostEditorInput): UsePostEditorOutput => {
  const [currentUploadedImages, setCurrentUploadedImages] = useState<
    ImageWithUrl[]
  >(getInitialUploadedImages(initialBlocksDb ?? defaultBlogPostContent));

  const [blocksDB, dispatchBlocksDB] = useReducer(blocksDBReducer, {
    ...initialBlocksDb,
    canRedo: false,
    canUndo: false,
  });

  const { mutateAsync: updatePost } = useUpdatePost({ field: 'content' });

  const handleImages = async () => {
    const newPostBlocks = JSON.parse(JSON.stringify(blocksDB));
    const newImagesUploadedUrls = new Map<string, string>();
    const newImagesDeletedUrls = new Set<string>();

    const imagesToHandle = getImagesFromBlocks({
      blocks: blocksDB.blocks,
      currentUploadedImages,
    });

    // UPLOAD IMAGES
    await Promise.all(
      imagesToHandle.toUpload.map(async ({ image, blockId }) => {
        if (!isImageBlock(newPostBlocks.blocks[blockId])) return;

        try {
          const imageUrl = await uploadToS3({
            getPresignedUrl: () =>
              createPresignedUrl({
                folder: `${userId}/${postId}`,
                defaultFileId: blockId,
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
        const key = new URL(imageUrl).searchParams.get('key');
        try {
          await deleteFile({
            key,
          });
          newImagesDeletedUrls.add(imageUrl);
        } catch (e) {
          console.log(`Image with url ${imageUrl} could not be deleted`);
        }
      })
    );

    //RESET CURRENT UPLOADED IMAGES
    setCurrentUploadedImages((state) => [
      ...state.filter(({ imageUrl }) => !newImagesDeletedUrls.has(imageUrl)),
      ...Array.from(newImagesUploadedUrls.entries()).map(
        ([blockId, imageUrl]) => ({ blockId, imageUrl })
      ),
    ]);

    return newPostBlocks;
  };

  const onSave = async () => {
    if (saving === 'saving') return;
    setSaving('saving');

    const content = await handleImages();
    const newPostData = {
      content: {
        blocks: content.blocks,
        chains: content.chains,
      },
      wordCount: getWordCount(content.blocks),
    };

    await updatePost({ postId, data: newPostData });

    setSaving('saved');
  };

  useAutosave({ data: blocksDB, onSave, interval: saveInterval });

  return {
    blocksDB,
    dispatchBlocksDB,
    onSave,
  };
};
