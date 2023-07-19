'use client';

import { EditEntryLayout } from '@smart-admin/components/layout';
import { clientTRPC } from '@smart-admin/trpc';
import { TRPCError } from '@trpc/server';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useRouter } from 'next/navigation';

import { RouterOutputs } from '@smartcoorp/smart-api';
import { isNumber } from '@smartcoorp/smart-types';
import { RHFCheckbox } from '@smartcoorp/ui/checkbox';
import { RHFFormField } from '@smartcoorp/ui/form-field';
import { Col, Grid, Row } from '@smartcoorp/ui/grid';
import { BlocksDB, PostEditor } from '@smartcoorp/ui/post-editor';
import { Option, RHFSelect } from '@smartcoorp/ui/select';
import { Tabs } from '@smartcoorp/ui/tabs';
import { spaceL } from '@smartcoorp/ui/tokens';

const FormFieldContainer = styled.div`
  margin-bottom: ${spaceL};
`;

type PostData = RouterOutputs['blogPost']['getById'];

const defaultBlobPostContent: BlocksDB = {
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
type EditPostProps = {
  params: {
    postId: string;
  };
};

const EditPost = ({ params }: EditPostProps) => {
  const router = useRouter();

  const [postBlocks, setPostBlocks] = useState<BlocksDB>(
    defaultBlobPostContent
  );
  const blogPostId = useMemo(() => {
    if (isNumber(params.postId)) {
      return parseInt(params.postId as unknown as string);
    }
    return -1;
  }, [params.postId]);

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

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<Omit<PostData, 'content'>>({
    defaultValues: {
      title: '',
      published: false,
      description: '',
      readTime: 0,
    },
  });

  useEffect(() => {
    reset(data);
    setPostBlocks((data?.content as BlocksDB) ?? defaultBlobPostContent);
  }, [data, reset]);

  const onSave = async (data: Omit<PostData, 'content'>) => {
    console.log(data);
    console.log(postBlocks);

    try {
      if (blogPostId === -1) {
        const createdPost = await createPost.mutateAsync({
          ...data,
          content: postBlocks,
        });
        router.push(`/blog/posts/${createdPost.id}`);
      } else {
        await updatePost.mutateAsync({ ...data, content: postBlocks });
        reset({}, { keepValues: true });
      }
    } catch (e) {
      if (e instanceof TRPCError) console.log(e.message);
    }
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

  return (
    <EditEntryLayout
      title="Blog Post"
      entryId={blogPostId}
      onSave={handleSubmit(onSave)}
      onDelete={onDelete}
      status={status}
      fetchStatus={fetchStatus}
      isLoading={
        createPost.isLoading || updatePost.isLoading || deletePost.isLoading
      }
      isDirty={false}
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
                      <Col size={6}>
                        <FormFieldContainer>
                          <RHFFormField
                            control={control}
                            name="title"
                            label="Title"
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
                            rules={{ required: true }}
                          />
                        </FormFieldContainer>
                      </Col>
                    </Row>
                    <FormFieldContainer>
                      <RHFSelect
                        options={authorOptions}
                        control={control}
                        name="authorId"
                        label="Post Author"
                        rules={{ required: true }}
                      />
                    </FormFieldContainer>

                    <RHFCheckbox
                      control={control}
                      name="published"
                      label="Is post published"
                    />
                  </Col>
                  <Col size={6}>
                    <RHFFormField
                      height={269}
                      control={control}
                      name="description"
                      label="Description"
                      rules={{ required: true }}
                      isMultiline
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
              <PostEditor
                blocksDB={postBlocks}
                setBlocksDB={setPostBlocks}
                getMetaData={getMetaDataMutate}
              />
            ),
          },
        ]}
      />
    </EditEntryLayout>
  );
};

export default EditPost;
