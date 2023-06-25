import { TRPCError } from '@trpc/server';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useRouter } from 'next/router';

import { isNumber } from '@smartcoorp/smart-types';
import { RouterOutputs, trpc } from '@smartcoorp/trpc';
import { RHFCheckbox } from '@smartcoorp/ui/checkbox';
import { DotLoading } from '@smartcoorp/ui/dot-loading';
import { RHFFormField } from '@smartcoorp/ui/form-field';
import { Col, Grid, Row } from '@smartcoorp/ui/grid';
import { Headline } from '@smartcoorp/ui/headline';
import { BlocksDB, PostEditor } from '@smartcoorp/ui/post-editor';
import { Option, RHFSelect } from '@smartcoorp/ui/select';
import { Tabs } from '@smartcoorp/ui/tabs';
import { scale360, spaceL } from '@smartcoorp/ui/tokens';

import { EditEntryLayout } from '../../../components/layout/edit-entry.layout';

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

const EditUser = () => {
  const router = useRouter();

  const [postBlocks, setPostBlocks] = useState<BlocksDB>(
    defaultBlobPostContent
  );
  const blogPostId = useMemo(() => {
    if (isNumber(router.query.id)) {
      return parseInt(router.query.id as unknown as string);
    }
    return -1;
  }, [router.query.id]);

  const createPost = trpc.blogPost.create.useMutation();
  const updatePost = trpc.blogPost.update.useMutation();
  const deletePost = trpc.blogPost.delete.useMutation();
  const { data, status, fetchStatus } = trpc.blogPost.getById.useQuery(
    { id: blogPostId },
    {
      enabled: blogPostId !== -1,
    }
  );

  const { data: authors } = trpc.blogPostAuthors.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

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
    trpc.metadata.getByUrl.useMutation();

  const content =
    status === 'error' ? (
      <Headline>Error</Headline>
    ) : status === 'loading' && fetchStatus !== 'idle' ? (
      <Headline>
        <DotLoading /> Loading form data...
      </Headline>
    ) : (
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
                      style={{ height: scale360 }}
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
    );

  return (
    <EditEntryLayout
      title="Blog Post"
      entryId={blogPostId}
      onSave={handleSubmit(onSave)}
      onDelete={onDelete}
      isLoading={
        createPost.isLoading || updatePost.isLoading || deletePost.isLoading
      }
      isDirty={isDirty}
    >
      {content}
    </EditEntryLayout>
  );
};

export default EditUser;
