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
import { RHFRadioGroup } from '@smartcoorp/ui/radio-group';

import { EditEntryLayout } from '../../components/layout/edit-entry.layout';

type UserData = RouterOutputs['user']['getUserById'];

const EditUser = () => {
  const router = useRouter();
  const userId = useMemo(() => {
    if (isNumber(router.query.id)) {
      return parseInt(router.query.id as unknown as string);
    }
    return -1;
  }, [router.query.id]);

  const { data, status, fetchStatus } = trpc.user.getUserById.useQuery(userId, {
    enabled: userId !== -1,
  });

  const deleteUsers = trpc.user.deleteUsers.useMutation();
  const createUser = trpc.user.createUser.useMutation();
  const updateUser = trpc.user.updateUser.useMutation();

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<UserData>({
    defaultValues: {
      username: '',
      email: '',
      role: 'USER',
    },
  });

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  const onSave = async (data: UserData) => {
    try {
      if (userId === -1) {
        const createdUser = await createUser.mutateAsync({
          ...data,
          password: process.env.NEXT_PUBLIC_DEFAULT_PASSWORD as string,
        });
        router.push(`/user/${createdUser.id}`);
      } else {
        await updateUser.mutateAsync({ id: userId, ...data });
        reset({}, { keepValues: true });
      }
    } catch (e) {
      if (e instanceof TRPCError) console.log(e.message);
    }
  };

  const onDelete = async () => {
    try {
      await deleteUsers.mutateAsync({ ids: [userId] });
      router.push('/users');
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
              name="email"
              label="Email"
              rules={{ required: true }}
            />
          </Col>
          <Col size={6}>
            <RHFFormField
              control={control}
              name="username"
              label="Username"
              rules={{ required: true }}
            />
          </Col>
        </Row>
        <RHFRadioGroup
          control={control}
          label="Role"
          name="role"
          options={[
            { label: 'Admin', value: 'ADMIN' },
            { label: 'User', value: 'USER' },
          ]}
        />
      </Grid>
    );

  return (
    <EditEntryLayout
      title="User"
      entryId={userId}
      onSave={handleSubmit(onSave)}
      onDelete={onDelete}
      isLoading={
        createUser.isLoading || updateUser.isLoading || deleteUsers.isLoading
      }
      isDirty={isDirty}
    >
      {content}
    </EditEntryLayout>
  );
};

export default EditUser;
