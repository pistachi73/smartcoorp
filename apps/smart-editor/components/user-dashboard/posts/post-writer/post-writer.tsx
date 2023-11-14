'use client';

import { getMetadata } from '@smart-editor/actions/get-metadata';
import { usePostEditor } from '@smart-editor/hooks/use-post-editor';

import { PostEditor } from '@smartcoorp/ui/post-editor';
import { spaceL } from '@smartcoorp/ui/tokens';

import { useGetPost, useUpdatePost } from '../posts.hooks';

import { Header } from './header/header';

type PostWriterProps = {
  userId: string;
  postId: string;
};

export const PostWriter = ({ userId, postId }: PostWriterProps) => {
  const { data } = useGetPost();
  const { mutateAsync: updatePost } = useUpdatePost({ field: 'content' });

  const {
    postBlocks,
    setPostBlocks,
    handleImages,
    currentUploadedImages,
    setImagesToHandle,
    getWordCount,
  } = usePostEditor({
    postId,
    userId,
    initialBlocks: data?.post?.content,
  });

  // const onSave = async (data: FormData) => {
  //   setLoading(true);
  //   const postBlocks = await handleImages();
  //   let coverImageUrl;

  //   try {
  //     coverImageUrl = await handleSingleFileUpload(data.coverImageUrl);
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   const postData = {
  //     ...data,
  //     content: postBlocks,
  //     coverImageUrl,
  //     wordCount: getWordCount(),
  //   };

  //   try {
  //     await updatePost({
  //       postId,
  //       userId: userId,
  //       data: postData,
  //     });

  //     reset({}, { keepValues: true });
  //     toast.success('Post saved!');
  //   } catch (e) {
  //     toast.error('Error saving post');
  //   }

  //   setLoading(false);
  // };

  return (
    <>
      <Header isSaving={false} />
      <div
        style={{
          marginTop: spaceL,
        }}
      >
        <PostEditor
          blocksDB={postBlocks}
          setBlocksDB={setPostBlocks}
          maxImages={5}
          getMetaData={getMetadata}
          currentUploadedImages={currentUploadedImages}
          setImagesToHandle={setImagesToHandle}
          toolbarTopOffset={60}
        />
      </div>
    </>
  );
};
