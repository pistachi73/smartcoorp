import { TRPCError } from '@trpc/server';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { isNumber } from '@smartcoorp/smart-types';
import { RouterOutputs, trpc } from '@smartcoorp/trpc';
import { DotLoading } from '@smartcoorp/ui/dot-loading';
import { RHFFormField } from '@smartcoorp/ui/form-field';
import { Col, Grid, Row } from '@smartcoorp/ui/grid';
import { Headline } from '@smartcoorp/ui/headline';

import { EditEntryLayout } from '../../../components/layout/edit-entry.layout';

type AuthorData = RouterOutputs['blogPostAuthors']['getById'];

const EditAuthor = () => {
  const router = useRouter();
  const authorId = useMemo(() => {
    if (isNumber(router.query.id)) {
      return parseInt(router.query.id as unknown as string);
    }
    return -1;
  }, [router.query.id]);

  const { data, status, fetchStatus } = trpc.blogPostAuthors.getById.useQuery(
    { id: authorId },
    {
      enabled: authorId !== -1,
    }
  );

  const deleteAuthor = trpc.blogPostAuthors.delete.useMutation();
  const createAuthor = trpc.blogPostAuthors.create.useMutation();
  const updateAuthor = trpc.blogPostAuthors.update.useMutation();

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<AuthorData>({
    defaultValues: {
      name: '',
      website: '',
      bio: '',
    },
  });

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  const onSave = async (data: AuthorData) => {
    try {
      if (authorId === -1) {
        const createdAuthor = await createAuthor.mutateAsync({
          ...data,
        });
        router.push(`/blog/authors/${createdAuthor.id}`);
      } else {
        await updateAuthor.mutateAsync({ ...data });
        reset({}, { keepValues: true });
      }
    } catch (e) {
      if (e instanceof TRPCError) console.log(e.message);
    }
  };

  const onDelete = async () => {
    try {
      await deleteAuthor.mutateAsync({ id: authorId });
      router.push('/blog/authors');
    } catch (e) {
      if (e instanceof TRPCError) console.log(e.message);
    }
  };

  const content =
    status === 'error' ? (
      <Headline>Error</Headline>
    ) : status === 'loading' && fetchStatus !== 'idle' ? (
      <Headline>
        <DotLoading /> Loading form data...
      </Headline>
    ) : (
      <Grid>
        <Row>
          <Col size={6}>
            <RHFFormField
              control={control}
              name="name"
              label="Name"
              rules={{ required: true }}
            />
          </Col>
          <Col size={6}>
            <RHFFormField
              control={control}
              name="website"
              label="Website"
              rules={{ required: true }}
            />
          </Col>
        </Row>
        <Row>
          <Col size={12}>
            <RHFFormField
              height={222}
              control={control}
              name="bio"
              label="Bio"
              rules={{ required: true }}
              isMultiline
            />
          </Col>
        </Row>
      </Grid>
    );

  return (
    <EditEntryLayout
      title="Blog Post Author"
      entryId={authorId}
      onSave={handleSubmit(onSave)}
      onDelete={onDelete}
      isLoading={
        createAuthor.isLoading ||
        updateAuthor.isLoading ||
        deleteAuthor.isLoading
      }
      isDirty={isDirty}
    >
      {content}
    </EditEntryLayout>
  );
};

export default EditAuthor;
