'use client';

import { User } from '@prisma/client';
import { EditEntryLayout } from '@smart-admin/components/layout';
import { useSingleFileUpload } from '@smart-admin/hooks';
import { clientTRPC } from '@smart-admin/trpc';
import { TRPCError } from '@trpc/server';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from 'styled-components';

import { useRouter } from 'next/navigation';

import { isNumber } from '@smartcoorp/smart-types';
import { RHFFileUpload } from '@smartcoorp/ui/file-upload';
import { RHFFormField } from '@smartcoorp/ui/form-field';
import { Col, Grid, Row } from '@smartcoorp/ui/grid';
import { RHFRadioGroup } from '@smartcoorp/ui/radio-group';

const FormFieldContainer = styled.div`
  margin-bottom: 1rem;
`;

type FormData = Pick<User, 'email' | 'role' | 'username'> & {
  profileImageUrl?: File | string | null;
};

type EditUserProps = {
  params: {
    userId: string;
  };
};

const EditUser = ({ params }: EditUserProps) => {
  const [isLoading, setIsLoading] = useState(false);

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
    setValue,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      email: '',
      role: 'USER',
      profileImageUrl: '',
    },
  });

  const { setCurrentFile: setProfileImage, handleSingleFileUpload } =
    useSingleFileUpload({ folder: 'user-images' });

  useEffect(() => {
    reset(data);
    setProfileImage(data?.profileImageUrl);
  }, [data, reset, setProfileImage]);

  const onSave = async (data: FormData) => {
    setIsLoading(true);
    const profileImageUrl = await handleSingleFileUpload(data.profileImageUrl);
    const userData = { ...data, profileImageUrl };

    try {
      if (userId === -1) {
        const createdUser = await createUser.mutateAsync({
          ...userData,
          password: process.env.NEXT_PUBLIC_DEFAULT_PASSWORD as string,
        });
        router.push(`/users/${createdUser.id}`);
      } else {
        await updateUser.mutateAsync({ id: userId, ...userData });
        reset({}, { keepValues: true });
      }
    } catch (e) {
      if (e instanceof TRPCError) console.log(e.message);
    }

    setValue('profileImageUrl', profileImageUrl);
    setIsLoading(false);
  };

  const onDelete = async () => {
    try {
      await deleteUsers.mutateAsync({ ids: [userId] });
      router.push('/users');
    } catch (e) {
      if (e instanceof TRPCError) console.log(e.message);
    }
  };

  const isFormLoading =
    isLoading || updateUser.isLoading || createUser.isLoading;

  return (
    <EditEntryLayout
      title="User"
      entryId={userId}
      onSave={handleSubmit(onSave)}
      onDelete={onDelete}
      status={status}
      fetchStatus={fetchStatus}
      isLoading={isFormLoading}
      isDirty={isDirty}
    >
      <Grid>
        <Row>
          <Col size={6}>
            <FormFieldContainer>
              <RHFFormField
                control={control}
                name="email"
                label="Email"
                type="email"
                rules={{ required: 'This field is required' }}
                defaultValue={''}
                isDisabled={isFormLoading}
              />
            </FormFieldContainer>
            <FormFieldContainer>
              <RHFFormField
                control={control}
                name="username"
                label="Username"
                rules={{ required: 'This field is required' }}
                defaultValue={''}
                isDisabled={isFormLoading}
              />
            </FormFieldContainer>
            <RHFRadioGroup
              control={control}
              label="Role"
              name="role"
              options={[
                { label: 'Admin', value: 'ADMIN' },
                { label: 'User', value: 'USER' },
              ]}
              defaultValue={'USER'}
              isDisabled={isFormLoading}
            />
          </Col>
          <Col size={6}>
            <RHFFileUpload
              control={control}
              name="profileImageUrl"
              label="Profile Image"
              singleFilePreview={true}
              acceptedFileTypes={{
                'image/jpeg': [],
                'image/jpg': [],
                'image/png': [],
              }}
              isDisabled={isFormLoading}
            />
          </Col>
        </Row>
      </Grid>
    </EditEntryLayout>
  );
};

export default EditUser;
