'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useRouter } from 'next/navigation';

import { Button } from '@smartcoorp/ui/button';
import { RHFFormField } from '@smartcoorp/ui/form-field';

import { LoginFormData } from '../helpers';

export const LoginForm = () => {
  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);

    const response = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (response?.error) {
      toast.error(response.error);
    } else {
      router.push('/posts');
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RHFFormField
          label="Email"
          name="email"
          control={control}
          isDisabled={loading}
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Email address must be a valid address',
            },
          }}
        />
        <RHFFormField
          label="Password"
          name="password"
          control={control}
          isDisabled={loading}
          type="password"
          forgotPasswordHref="/forgot-password"
          rules={{
            required: 'Password is required',
          }}
        />
        <Button type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </>
  );
};
