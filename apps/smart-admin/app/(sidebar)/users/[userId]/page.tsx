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
import { RHFRadioGroup } from '@smartcoorp/ui/radio-group';

type UserData = RouterOutputs['user']['getUserById'];

type EditUserProps = {
  params: {
    userId: string;
  };
};

const EditUser = ({ params }: EditUserProps) => {
  const router = useRouter();
  const userId = useMemo(() => {
    if (isNumber(params.userId)) {
      return parseInt(params.userId as unknown as string);
    }
    return -1;
  }, [params.userId]);

  const { data, status, fetchStatus } = clientTRPC.user.getUserById.useQuery(
    userId,
    {
      enabled: userId !== -1,
    }
  );

  const deleteUsers = clientTRPC.user.deleteUsers.useMutation();
  const createUser = clientTRPC.user.createUser.useMutation();
  const updateUser = clientTRPC.user.updateUser.useMutation();

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
        router.push(`/users/${createdUser.id}`);
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

  return (
    <EditEntryLayout
      title="User"
      entryId={userId}
      onSave={handleSubmit(onSave)}
      onDelete={onDelete}
      status={status}
      fetchStatus={fetchStatus}
      isLoading={
        createUser.isLoading || updateUser.isLoading || deleteUsers.isLoading
      }
      isDirty={isDirty}
    >
      <Grid>
        <Row>
          <Col size={6}>
            <RHFFormField
              control={control}
              name="email"
              label="Email"
              type="email"
              rules={{ required: 'This field is required' }}
            />
          </Col>
          <Col size={6}>
            <RHFFormField
              control={control}
              name="username"
              label="Username"
              rules={{ required: 'This field is required' }}
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
    </EditEntryLayout>
  );
};

export default EditUser;
