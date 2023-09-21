'use client';

import { sendEmail } from '@smart-editor/actions/send-email';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useRouter } from 'next/navigation';

import { Button } from '@smartcoorp/ui/button';
import { RHFFormField } from '@smartcoorp/ui/form-field';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12),
});

export type LoginFormData = z.infer<typeof loginSchema>;

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

    console.log({ response });
    if (response?.error) {
      toast.error('Invalid credentials');
    } else {
      router.push('/');
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
      <Button
        onClick={() =>
          sendEmail('oscarpulido98@gmail.com', 'test subject', 'test body')
        }
      >
        Send email
      </Button>
    </>
  );
};
