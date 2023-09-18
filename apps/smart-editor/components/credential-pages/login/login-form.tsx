'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { FormField, RHFFormField } from '@smartcoorp/ui/form-field';

import { disabled } from '../../../../../libs/ui/button/src/button.styles';

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
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);

    const response = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    console.log({ response });
    if (response?.error) {
      setError('Invalid credentials');
    } else {
      console.log('HOla');
      // router.push('/');
    }

    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
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
            maxLength: {
              value: 50,
              message: 'The email should have at most 50 characters',
            },
          }}
        />
        <RHFFormField
          label="Password"
          name="password"
          control={control}
          isDisabled={loading}
          type="password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 4,
              message: 'The password should have at least 4 characters',
            },
          }}
        />
        <Button type="submit" loading={loading}>
          Login
        </Button>
        {error && (
          <Body size="xsmall" sizeWide="small" noMargin variant="error">
            {error}
          </Body>
        )}
      </form>

      <Body size="xsmall" sizeWide="small" noMargin variant="neutral">
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </Body>
    </>
  );
};
