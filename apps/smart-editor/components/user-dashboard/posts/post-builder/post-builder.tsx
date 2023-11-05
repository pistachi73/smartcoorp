'use client';

import { EPostStatus } from '@prisma/client';
import { getMetadata } from '@smart-editor/actions/get-metadata';
import { getPost, updatePost } from '@smart-editor/actions/posts.actions';
import { usePostEditor } from '@smart-editor/hooks/use-post-editor';
import { useSingleFileUpload } from '@smart-editor/hooks/use-single-file-upload';
import { fromContentToJSON } from '@smart-editor/utils/from-content-to-json';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  BsClipboard,
  BsCloudDownload,
  BsJournalText,
  BsPen,
  BsSave,
  BsTrash,
} from 'react-icons/bs';
import { toast } from 'sonner';
import { z } from 'zod';

import { useRouter } from 'next/navigation';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { useDeviceType } from '@smartcoorp/ui/device-only';
import { RHFFileUpload } from '@smartcoorp/ui/file-upload';
import { RHFFormField } from '@smartcoorp/ui/form-field';
import { Headline } from '@smartcoorp/ui/headline';
import { BlocksDB, PostEditor } from '@smartcoorp/ui/post-editor';
import { RHFSelect } from '@smartcoorp/ui/select';
import { Tabs } from '@smartcoorp/ui/tabs';

import { DeletePostDialog } from '../delete-post-dialog';

import {
  FieldContainer,
  Header,
  IdContainer,
  PostInformationContainer,
} from './post-builder.styles';

const FormSchema = z.object({
  title: z.nullable(z.string()),
  description: z.nullable(z.string()),
  wordCount: z.nullable(z.number()),
  status: z.nativeEnum(EPostStatus),
  coverImageUrl: z.nullable(z.any()).optional(),
});

type FormData = z.infer<typeof FormSchema>;

type PostBuilderProps = {
  userId: string;
  postId: string;
};

export const PostBuilder = ({ userId, postId }: PostBuilderProps) => {
  const router = useRouter();
  const { deviceType } = useDeviceType();

  const { data } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost({ postId, userId }),
    refetchOnWindowFocus: false,
  });

  const [loading, setLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  const { control, reset, handleSubmit } = useForm<FormData>({
    defaultValues: {
      title: data?.post?.title ?? '',
      wordCount: data?.post?.wordCount ?? 0,
      status: data?.post?.status,
      coverImageUrl: data?.post?.coverImageUrl ?? '',
      description: data?.post?.description ?? '',
    },
  });

  useEffect(() => {
    reset({
      title: data?.post?.title ?? '',
      wordCount: data?.post?.wordCount ?? 0,
      status: data?.post?.status,
      coverImageUrl: data?.post?.coverImageUrl ?? '',
      description: data?.post?.description ?? '',
    });
    setPostBlocks(data?.post?.content as BlocksDB);
  }, [data?.post, reset, setPostBlocks]);

  const { handleSingleFileUpload } = useSingleFileUpload({
    folder: `${data?.post?.userId}/${data?.post?.id}`,
    initialFile: data?.post?.coverImageUrl,
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

    const postData = {
      ...data,
      content: postBlocks,
      coverImageUrl,
      wordCount: getWordCount(),
    };

    try {
      await updatePost({
        postId,
        userId: userId,
        data: postData,
      });

      reset({}, { keepValues: true });
      toast.success('Post saved!');
    } catch (e) {
      toast.error('Error saving post');
    }

    setLoading(false);
  };

  const onIdCopy = () => {
    toast.success('Id copied to clipboard');
    navigator.clipboard.writeText(postId);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSave)}>
        <Header>
          <Headline size="xlarge" noMargin as="h1">
            Post builder
          </Headline>
          <div>
            <Button
              size="small"
              variant="text"
              {...(deviceType === 'mobile' && { icon: BsCloudDownload })}
              onClick={() => {
                fromContentToJSON({
                  title: data?.post?.title,
                  content: postBlocks,
                });
              }}
            >
              {deviceType === 'mobile' ? '' : 'Export JSON'}
            </Button>
            <Button
              size="small"
              variant="secondary"
              disabled={loading}
              onClick={() => setIsDeleteDialogOpen(true)}
              {...(deviceType === 'mobile' && { icon: BsTrash })}
            >
              {deviceType === 'mobile' ? '' : 'Delete'}
            </Button>

            <Button
              size="small"
              type="submit"
              loading={loading}
              {...(deviceType === 'mobile' && { icon: BsSave })}
            >
              {deviceType === 'mobile' ? '' : 'Save'}
            </Button>
          </div>
        </Header>
        <Tabs
          defaultTab="post-info"
          tabs={[
            {
              id: 'post-info',
              labelIcon: BsJournalText,
              label: deviceType === 'mobile' ? 'Info' : 'Post information',

              content: (
                <PostInformationContainer>
                  <FieldContainer>
                    <Body noMargin size="medium" fontWeight="bold">
                      Unique Identifier
                      <Body
                        variant="neutral"
                        as="span"
                        size="xsmall"
                        noMargin
                        style={{
                          display: 'block',
                        }}
                      >
                        Used for fetching the post
                      </Body>
                    </Body>
                    <IdContainer
                      type="button"
                      aria-label="Copy Id to clipboard"
                      onClick={onIdCopy}
                    >
                      <Body variant="neutral" ellipsis noMargin>
                        {postId}
                      </Body>
                      <BsClipboard size={14} />
                    </IdContainer>
                  </FieldContainer>

                  <FieldContainer>
                    <Body noMargin size="medium" fontWeight="bold">
                      Title
                    </Body>

                    <RHFFormField
                      control={control}
                      name="title"
                      placeholder="Enter post title"
                    />
                  </FieldContainer>

                  <FieldContainer>
                    <Body noMargin size="medium" fontWeight="bold">
                      Description
                      <Body
                        variant="neutral"
                        as="span"
                        size="xsmall"
                        noMargin
                        style={{
                          display: 'block',
                        }}
                      >
                        Maximum 280 characters
                      </Body>
                    </Body>
                    <RHFFormField
                      control={control}
                      name="description"
                      isMultiline
                      maxChars={280}
                      rules={{
                        maxLength: 280,
                      }}
                      placeholder="Enter post description"
                    />
                  </FieldContainer>
                  <FieldContainer>
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
                  </FieldContainer>
                  <FieldContainer>
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
                      helperText="Cover images will be updated in 24h."
                      // isDisabled={isFormLoading || blogPostId === -1}
                    />
                  </FieldContainer>
                </PostInformationContainer>
              ),
            },
            {
              id: 'post-editor',
              label: deviceType === 'mobile' ? 'Editor' : 'Post Editor',
              labelIcon: BsPen,
              content: (
                <PostEditor
                  blocksDB={postBlocks}
                  setBlocksDB={setPostBlocks}
                  maxImages={5}
                  getMetaData={getMetadata}
                  currentUploadedImages={currentUploadedImages}
                  setImagesToHandle={setImagesToHandle}
                />
              ),
            },
          ]}
        />
      </form>
      <DeletePostDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        postId={postId}
        coverImageUrl={data?.post?.coverImageUrl}
        onSuccess={() => router.push('/posts')}
      />
    </>
  );
};
