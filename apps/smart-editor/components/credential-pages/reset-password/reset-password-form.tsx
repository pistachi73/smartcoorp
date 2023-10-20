'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useParams, useRouter } from 'next/navigation';

import { Button } from '@smartcoorp/ui/button';
import { RHFFormField } from '@smartcoorp/ui/form-field';

import { type ResetPasswordFormData, passwordInputValidator } from '../helpers';

import { resetPasswordAction } from './action';

export const ResetPasswordForm = () => {
  const params = useParams();
  const { control, handleSubmit } = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: ResetPasswordFormData) => {
    setLoading(true);

    const { error } = await resetPasswordAction(data, params.token);

    if (error) {
      toast.error(error);
    } else {
      router.push('/login');
    }

    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFFormField
        label="Password"
        name="password"
        control={control}
        isDisabled={loading}
        type="password"
        rules={passwordInputValidator}
      />
      <RHFFormField
        label="Confirm password"
        name="confirmPassword"
        control={control}
        isDisabled={loading}
        type="password"
        rules={passwordInputValidator}
      />
      <Button type="submit" loading={loading}>
        Set new Password
      </Button>
    </form>
  );
};
