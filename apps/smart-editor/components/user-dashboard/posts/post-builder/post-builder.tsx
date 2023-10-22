'use client';

import { EPost, EPostStatus } from '@prisma/client';
import { usePostEditor } from '@smart-editor/hooks/use-post-editor';
import { useSingleFileUpload } from '@smart-editor/hooks/use-single-file-upload';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsClipboard, BsJournalText, BsPen } from 'react-icons/bs';
import { toast } from 'sonner';
import { z } from 'zod';

import { useRouter } from 'next/navigation';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Caption } from '@smartcoorp/ui/caption';
import { Dialog, DialogContent, DialogTrigger } from '@smartcoorp/ui/dialog';
import { RHFFileUpload } from '@smartcoorp/ui/file-upload';
import { FormField, RHFFormField } from '@smartcoorp/ui/form-field';
import { Headline } from '@smartcoorp/ui/headline';
import { BlocksDB, PostEditor } from '@smartcoorp/ui/post-editor';
import { RHFSelect } from '@smartcoorp/ui/select';
import { Tabs } from '@smartcoorp/ui/tabs';
import { gray500 } from '@smartcoorp/ui/tokens';

import { disabled } from '../../../../../../libs/ui/button/src/button.styles';
import { deletePost } from '../actions/delete-post';
import { getPost } from '../actions/get-posts';
import { updatePost } from '../actions/update-post';
import {
  DeleteDialogTextContainer,
  TrashImageContainer,
} from '../posts.styles';

import {
  Header,
  IdContainer,
  PostInformationContainer,
} from './post-builder.styles';

const FormSchema = z.object({
  title: z.nullable(z.string()),
  wordCount: z.nullable(z.number()),
  status: z.nativeEnum(EPostStatus),
  coverImageUrl: z.nullable(z.any()).optional(),
});

type FormData = z.infer<typeof FormSchema>;

type PostBuilderProps = {
  initialPost: EPost;
  userId: string;
  postId: string;
};

export const PostBuilder = ({
  initialPost,
  userId,
  postId,
}: PostBuilderProps) => {
  const router = useRouter();

  const { data: post } = useQuery(['post', postId], {
    queryFn: async () =>
      await getPost({
        postId: initialPost.id,
        userId,
      }),
    initialData: initialPost,
    refetchOnWindowFocus: false,
  });

  const [loading, setLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteDialogLoading, setIsDeleteDialogLoading] = useState(false);

  const {
    postBlocks,
    setPostBlocks,
    handleImages,
    currentUploadedImages,
    setImagesToHandle,
    getWordCount,
  } = usePostEditor({
    postId: post.id,
    userId,
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

  useEffect(() => {
    reset({
      title: post.title ?? '',
      wordCount: post.wordCount ?? 0,
      status: post.status,
      coverImageUrl: post.coverImageUrl ?? '',
    });
    setPostBlocks(post.content as BlocksDB);
  }, [post, reset, setPostBlocks]);

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

    const postData = {
      ...data,
      content: postBlocks,
      coverImageUrl,
      wordCount: getWordCount(),
    };

    try {
      await updatePost({
        postId: post.id,
        userId: post.userId,
        data: postData,
      });

      reset({}, { keepValues: true });
      toast.success('Post saved!');
    } catch (e) {
      toast.error('ERROR');
    }

    setLoading(false);
  };

  const onDelete = async () => {
    setIsDeleteDialogLoading(true);

    const { error } = await deletePost({ postId: post.id });

    if (error) {
      toast.error(error);
      setIsDeleteDialogLoading(false);
      return;
    }

    toast.success('Post deleted!');

    router.push('/posts');

    setIsDeleteDialogLoading(false);
  };

  const onIdCopy = () => {
    toast.success('Id copied to clipboard');

    navigator.clipboard.writeText(post.id.toString());
  };

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <Header>
        <Headline size="xlarge" noMargin style={{}}>
          Post builder
        </Headline>
        <div>
          <Dialog
            defaultOpen={false}
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger asChild>
              <Button size="small" variant="secondary" disabled={loading}>
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent
              title="Are you sure you want to delete this post?"
              description="This action cannot be undone."
              onAction={onDelete}
              onCancel={() => setIsDeleteDialogOpen(false)}
              actionLabel={`Yes, delete`}
              cancelLabel="Cancel"
              loading={isDeleteDialogLoading}
              variant="danger"
            >
              <TrashImageContainer>
                <img src={'/illustrations/recycle-bin.svg'} alt="Delete post" />
              </TrashImageContainer>

              <DeleteDialogTextContainer>
                <Headline as="h2" size="large" noMargin>
                  Delete Post
                </Headline>
                <Body size="small" noMargin>
                  Are you sure you want to delete this post?
                </Body>
                <Body variant="error" size="small" fontWeight="bold">
                  This action cannot be undone.
                </Body>
              </DeleteDialogTextContainer>
            </DialogContent>
          </Dialog>

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
                  {post.id}
                  <BsClipboard size={14} />
                </IdContainer>
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
                  helperText="Cover images will be updated in 24h."
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
