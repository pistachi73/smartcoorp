'use client';

import { EditEntryLayout } from '@smart-admin/components/layout';
import { clientTRPC } from '@smart-admin/trpc';
import { TRPCError } from '@trpc/server';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { RouterOutputs } from '@smartcoorp/smart-api';
import { isNumber } from '@smartcoorp/smart-types';
import { DotLoading } from '@smartcoorp/ui/dot-loading';
import { RHFFormField } from '@smartcoorp/ui/form-field';
import { Col, Grid, Row } from '@smartcoorp/ui/grid';
import { Headline } from '@smartcoorp/ui/headline';

type EditUserProps = {
  params: {
    postAuthorId: string;
  };
};

type AuthorData = RouterOutputs['blogPostAuthors']['getById'];

const EditAuthor = ({ params }: EditUserProps) => {
  const router = useRouter();
  const authorId = useMemo(() => {
    if (isNumber(params.postAuthorId)) {
      return parseInt(params.postAuthorId as unknown as string);
    }
    return -1;
  }, [params.postAuthorId]);

  const { data, status, fetchStatus } =
    clientTRPC.blogPostAuthors.getById.useQuery(
      { id: authorId },
      {
        enabled: authorId !== -1,
      }
    );

  const deleteAuthor = clientTRPC.blogPostAuthors.delete.useMutation();
  const createAuthor = clientTRPC.blogPostAuthors.create.useMutation();
  const updateAuthor = clientTRPC.blogPostAuthors.update.useMutation();

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

  return (
    <EditEntryLayout
      title="Blog Post Author"
      entryId={authorId}
      onSave={handleSubmit(onSave)}
      onDelete={onDelete}
      status={status}
      fetchStatus={fetchStatus}
      isLoading={
        createAuthor.isLoading ||
        updateAuthor.isLoading ||
        deleteAuthor.isLoading
      }
      isDirty={isDirty}
    >
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
        <Row noMargin>
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
    </EditEntryLayout>
  );
};

export default EditAuthor;
