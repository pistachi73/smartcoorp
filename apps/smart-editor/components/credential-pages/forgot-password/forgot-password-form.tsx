'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@smartcoorp/ui/button';
import { RHFFormField } from '@smartcoorp/ui/form-field';

import { type ForgotPasswordFormData, emailnputValidator } from '../helpers';

import { useSendForgotPasswordEmail } from './forgot-password.hooks';

export const ForgotPasswordForm = () => {
  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: '',
    },
  });

  const { mutate: sendForgotPasswordEmail, isLoading } =
    useSendForgotPasswordEmail();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await sendForgotPasswordEmail({ email: data.email });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFFormField
        label="Email"
        name="email"
        control={control}
        isDisabled={isLoading}
        type="email"
        rules={emailnputValidator}
      />
      <Button type="submit" loading={isLoading}>
        Reset Password
      </Button>
    </form>
  );
};
