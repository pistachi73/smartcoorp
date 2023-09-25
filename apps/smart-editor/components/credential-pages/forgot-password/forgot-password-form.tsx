'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useRouter } from 'next/navigation';

import { Button } from '@smartcoorp/ui/button';
import { RHFFormField } from '@smartcoorp/ui/form-field';

import { type ForgotPasswordFormData } from '../helpers';

import { forgotPasswordAction } from './action';

export const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: '',
    },
  });

  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setLoading(true);

    const { error } = await forgotPasswordAction(data);

    if (error) {
      toast.error(error);
    } else {
      router.push('/forgot-password/success');
    }

    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFFormField
        label="Email"
        name="email"
        control={control}
        isDisabled={loading}
        type="email"
        rules={{
          required: 'Email is required',
        }}
      />
      <Button type="submit" loading={loading}>
        Reset Password
      </Button>
    </form>
  );
};
