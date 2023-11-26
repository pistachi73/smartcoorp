'use client';

import { BlogPost } from '@prisma/client';
import { EditEntryLayout } from '@smart-admin/components/layout';
import {
  SingleFileUpload,
  defaultBlobPostContent,
  usePostEditor,
  useSingleFileUpload,
} from '@smart-admin/hooks';
import { clientTRPC } from '@smart-admin/trpc';
import { TRPCError } from '@trpc/server';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useRouter } from 'next/navigation';

import { isNumber } from '@smartcoorp/smart-types';
import { RHFCheckbox } from '@smartcoorp/ui/checkbox';
import { RHFFileUpload } from '@smartcoorp/ui/file-upload';
import { RHFFormField } from '@smartcoorp/ui/form-field';
import { Col, Grid, Row } from '@smartcoorp/ui/grid';
import { BlocksDB, PostEditor } from '@smartcoorp/ui/post-editor';
import { Option, RHFSelect } from '@smartcoorp/ui/select';
import { Tabs } from '@smartcoorp/ui/tabs';
import { spaceL } from '@smartcoorp/ui/tokens';

const FormFieldContainer = styled.div`
  margin-bottom: ${spaceL};
`;

type FormData = Omit<
  BlogPost,
  'content' | 'portraitImageUrl' | 'createdAt' | 'updatedAt'
> & {
  portraitImageUrl?: SingleFileUpload;
};

type EditPostProps = {
  params: {
    postId: string;
  };
};

const EditPost = ({ params }: EditPostProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const blogPostId = useMemo(() => {
    if (isNumber(params.postId)) {
      return parseInt(params.postId as unknown as string);
    }
    return -1;
  }, [params.postId]);
  const {
    postBlocks,
    setPostBlocks,
    handleImages,
    currentUploadedImages,
    setImagesToHandle,
    setInitialUploadedImages,
  } = usePostEditor({
    blogPostId: blogPostId.toString(),
  });

  const createPost = clientTRPC.blogPost.create.useMutation();
  const updatePost = clientTRPC.blogPost.update.useMutation();
  const deletePost = clientTRPC.blogPost.delete.useMutation();
  const { data, status, fetchStatus } = clientTRPC.blogPost.getById.useQuery(
    { id: blogPostId },
    {
      enabled: blogPostId !== -1,
    }
  );

  const { data: authors } = clientTRPC.blogPostAuthors.getAll.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
    }
  );

  const authorOptions: Option[] | undefined = useMemo(
    () =>
      authors?.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
    [authors]
  );

  const { control, reset, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      title: '',
      published: false,
      description: '',
      readTime: 0,
      portraitImageUrl: '',
    },
  });

  const { setCurrentFile: setPortraitImage, handleSingleFileUpload } =
    useSingleFileUpload({ folder: `blog-post-images/${blogPostId}` });

  useEffect(() => {
    reset(data);
    setPortraitImage(data?.portraitImageUrl);
    setPostBlocks((data?.content as BlocksDB) ?? defaultBlobPostContent);
    setInitialUploadedImages(
      (data?.content as BlocksDB)?.blocks ?? defaultBlobPostContent
    );
  }, [data, reset, setInitialUploadedImages, setPortraitImage, setPostBlocks]);

  const onSave = async (data: FormData) => {
    setIsLoading(true);
    const postBlocks = await handleImages();
    const portraitImageUrl = await handleSingleFileUpload(
      data.portraitImageUrl
    );
    const postData = { ...data, content: postBlocks, portraitImageUrl };

    try {
      if (blogPostId === -1) {
        const createdPost = await createPost.mutateAsync(postData);
        router.push(`/blog/posts/${createdPost.id}`);
      } else {
        await updatePost.mutateAsync(postData);
        reset({}, { keepValues: true });
      }
    } catch (e) {
      if (e instanceof TRPCError) console.log(e.message);
    }

    setValue('portraitImageUrl', portraitImageUrl);
    setIsLoading(false);
  };

  const onDelete = async () => {
    try {
      await deletePost.mutateAsync({ id: blogPostId });
      router.push('/blog/posts');
    } catch (e) {
      if (e instanceof TRPCError) console.log(e.message);
    }
  };

  const { mutateAsync: getMetaDataMutate } =
    clientTRPC.metadata.getByUrl.useMutation();

  const isFormLoading =
    isLoading ||
    createPost.isLoading ||
    updatePost.isLoading ||
    deletePost.isLoading;

  return (
    <EditEntryLayout
      title="Blog Post"
      entryId={blogPostId}
      onSave={handleSubmit(onSave)}
      onDelete={onDelete}
      status={status}
      fetchStatus={fetchStatus}
      isLoading={isFormLoading}
      isDirty={true}
    >
      <Tabs
        defaultTab="post-info"
        tabs={[
          {
            id: 'post-info',
            label: 'Post Info',
            content: (
              <Grid>
                <Row>
                  <Col size={6}>
                    <Row noMargin>
                      <Col size={12}>
                        <FormFieldContainer>
                          <RHFFormField
                            control={control}
                            name="title"
                            label="Title"
                            rules={{ required: true }}
                            isDisabled={isFormLoading}
                          />
                        </FormFieldContainer>
                      </Col>
                    </Row>
                    <Row noMargin>
                      <Col size={6}>
                        <FormFieldContainer>
                          <RHFSelect
                            options={authorOptions}
                            control={control}
                            name="authorId"
                            label="Post Author"
                            isDisabled={isFormLoading}
                            rules={{ required: true }}
                          />
                        </FormFieldContainer>
                      </Col>

                      <Col size={6}>
                        <FormFieldContainer>
                          <RHFFormField
                            control={control}
                            name="readTime"
                            label="Reading time (in minutes)"
                            type="number"
                            isDisabled={isFormLoading}
                            rules={{ required: true }}
                          />
                        </FormFieldContainer>
                      </Col>
                    </Row>
                    <FormFieldContainer>
                      <RHFFormField
                        height={269}
                        control={control}
                        name="description"
                        label="Description"
                        isDisabled={isFormLoading}
                        rules={{ required: true }}
                        isMultiline
                      />
                    </FormFieldContainer>

                    <RHFCheckbox
                      control={control}
                      name="published"
                      label="Is post published"
                    />
                  </Col>
                  <Col size={6}>
                    <RHFFileUpload
                      control={control}
                      name="portraitImageUrl"
                      label="Portrait Image"
                      singleFilePreview={true}
                      acceptedFileTypes={{
                        'image/jpeg': [],
                        'image/jpg': [],
                        'image/png': [],
                      }}
                      isDisabled={isFormLoading || blogPostId === -1}
                    />
                  </Col>
                </Row>
              </Grid>
            ),
          },
          {
            id: 'post-editor',
            label: 'Post Editor',
            content: (
              <div>PostEditor</div>
              // <PostEditor
              //   blocksDB={postBlocks}
              //   setBlocksDB={setPostBlocks}
              //   getMetaData={getMetaDataMutate}
              //   currentUploadedImages={currentUploadedImages}
              //   setImagesToHandle={setImagesToHandle}
              // />
            ),
          },
        ]}
      />
    </EditEntryLayout>
  );
};

export default EditPost;
