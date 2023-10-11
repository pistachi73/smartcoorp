'use client';

import { EPost, EPostStatus } from '@prisma/client';
import { usePostEditor } from '@smart-editor/hooks/use-post-editor';
import { useSingleFileUpload } from '@smart-editor/hooks/use-single-file-upload';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsJournalText, BsPen } from 'react-icons/bs';
import { z } from 'zod';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { RHFFileUpload } from '@smartcoorp/ui/file-upload';
import { RHFFormField } from '@smartcoorp/ui/form-field';
import { Headline } from '@smartcoorp/ui/headline';
import { PostEditor } from '@smartcoorp/ui/post-editor';
import { RHFSelect } from '@smartcoorp/ui/select';
import { Tabs } from '@smartcoorp/ui/tabs';

import { updatePost } from '../actions/update-post';
import { DeletePostDialog } from '../delete-post-dialog';

import { Header, PostInformationContainer } from './post-builder.styles';
const FormSchema = z.object({
  title: z.nullable(z.string()),
  wordCount: z.nullable(z.number()),
  status: z.nativeEnum(EPostStatus),
  coverImageUrl: z.nullable(z.any()).optional(),
});

type FormData = z.infer<typeof FormSchema>;

type PostBuilderProps = {
  post: EPost;
};

export const PostBuilder = ({ post }: PostBuilderProps) => {
  const [loading, setLoading] = useState(false);
  const {
    postBlocks,
    setPostBlocks,
    handleImages,
    currentUploadedImages,
    setImagesToHandle,
    getWordCount,
  } = usePostEditor({
    postId: post.id,
    userId: 1,
    initialBlocks: post.content,
  });

  const { control, reset, handleSubmit } = useForm<FormData>({
    defaultValues: {
      title: post.title ?? '',
      wordCount: post.wordCount ?? 0,
      status: post.status,
      coverImageUrl: post.coverImageUrl ?? '',
    },
  });

  const { handleSingleFileUpload } = useSingleFileUpload({
    folder: `${post.userId}/${post.id}`,
    initialFile: post.coverImageUrl,
  });

  const onSave = async (data: FormData) => {
    setLoading(true);
    const postBlocks = await handleImages();
    let coverImageUrl;
    try {
      coverImageUrl = await handleSingleFileUpload(data.coverImageUrl);
    } catch (e) {
      console.log(e);
    }

    console.log('ret');

    const postData = {
      ...data,
      content: postBlocks,
      coverImageUrl,
      wordCount: getWordCount(),
    };

    try {
      await updatePost({
        postId: Number(post.id),
        userId: Number(post.userId),
        data: postData,
      });

      reset({}, { keepValues: true });
    } catch (e) {
      toast.error('ERROR');
    }

    // setValue('coverImageUrl', coverImageUrl);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Header>
        <Headline size="xlarge" noMargin style={{}}>
          Post builder
        </Headline>
        <div>
          <DeletePostDialog
            postId={post.id}
            trigger={
              <Button size="small" variant="secondary" disabled={loading}>
                Delete
              </Button>
            }
          />

          <Button size="small" type="submit" loading={loading}>
            Save
          </Button>
        </div>
      </Header>
      <Tabs
        defaultTab="post-info"
        tabs={[
          {
            id: 'post-info',
            labelIcon: BsJournalText,
            label: 'Post information',
            content: (
              <PostInformationContainer>
                <Body noMargin size="medium" fontWeight="bold">
                  Title
                </Body>
                <RHFFormField
                  control={control}
                  name="title"
                  placeholder="Enter post title"
                />

                <Body noMargin size="medium" fontWeight="bold">
                  Status
                </Body>
                <RHFSelect
                  options={[
                    {
                      value: 'DRAFT',
                      label: 'Draft',
                    },
                    {
                      value: 'PUBLISHED',
                      label: 'Published',
                    },
                  ]}
                  control={control}
                  name="status"
                />
                <Body noMargin size="medium" fontWeight="bold">
                  Cover image
                </Body>
                <RHFFileUpload
                  control={control}
                  name="coverImageUrl"
                  singleFilePreview={true}
                  acceptedFileTypes={{
                    'image/jpeg': [],
                    'image/jpg': [],
                    'image/png': [],
                  }}
                  // isDisabled={isFormLoading || blogPostId === -1}
                />
              </PostInformationContainer>
            ),
          },
          {
            id: 'post-editor',
            label: 'Post Editor',
            labelIcon: BsPen,
            content: (
              <PostEditor
                blocksDB={postBlocks}
                setBlocksDB={setPostBlocks}
                // getMetaData={getMetaDataMutate}
                currentUploadedImages={currentUploadedImages}
                setImagesToHandle={setImagesToHandle}
              />
            ),
          },
        ]}
      />
    </form>
  );
};
