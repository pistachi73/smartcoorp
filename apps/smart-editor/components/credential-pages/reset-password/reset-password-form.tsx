'use client';

import { useForm } from 'react-hook-form';

import { useParams } from 'next/navigation';

import { Button } from '@smartcoorp/ui/button';
import { RHFFormField } from '@smartcoorp/ui/form-field';

import { type ResetPasswordFormData, passwordInputValidator } from '../helpers';

import { useResetPassword } from './reset-password.hooks';

export const ResetPasswordForm = () => {
  const params = useParams();
  const { control, handleSubmit, watch } = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: resetPassword, isLoading } = useResetPassword();

  const onSubmit = async (data: ResetPasswordFormData) => {
    await resetPassword({
      password: data.password,
      confirmPassword: data.confirmPassword,
      token: params.token,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFFormField
        label="Password"
        name="password"
        control={control}
        isDisabled={isLoading}
        type="password"
        rules={passwordInputValidator}
      />
      <RHFFormField
        label="Confirm password"
        name="confirmPassword"
        control={control}
        isDisabled={isLoading}
        type="password"
        rules={{
          required: 'Please confirm your password',
          validate: (confirmPassword: string) => {
            if (watch('password') != confirmPassword) {
              return 'Your passwords do no match';
            }
          },
        }}
      />
      <Button type="submit" loading={isLoading}>
        Set new Password
      </Button>
    </form>
  );
};
