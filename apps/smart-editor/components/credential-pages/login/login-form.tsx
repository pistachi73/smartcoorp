'use client';

import { sendAccountVerificationEmail } from '@smart-editor/actions/account.actions';
import { AuthorizeError } from '@smart-editor/utils/next-auth-config';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@smartcoorp/ui/button';
import { RHFFormField } from '@smartcoorp/ui/form-field';

import { LoginFormData } from '../helpers';

export const LoginForm = () => {
  const searchParams = useSearchParams();
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
      const { error } = response;

      const typedError = JSON.parse(error) as unknown as AuthorizeError;

      if (typedError.code === 401) {
        toast.error(typedError.message);
      }

      if (typedError.code === 403) {
        toast.error(typedError.message, {
          action: {
            label: 'Resend email',
            onClick: () =>
              toast.promise(
                async () => {
                  await new Promise((r) => setTimeout(r, 1000));
                  await sendAccountVerificationEmail({
                    userId: typedError?.data?.id,
                    email: typedError?.data?.email,
                    name: typedError?.data?.name,
                  });
                },
                {
                  loading: 'Sending email...',
                  success: 'Email sent',
                  error: (error) => {
                    if (error instanceof Error) {
                      return error.message;
                    } else {
                      return 'Error sending email. Please try again later.';
                    }
                  },
                }
              ),
          },
        });
      }
    } else {
      toast.success('Login successful');
      router.push('/posts');
    }

    setLoading(false);
  };

  useEffect(() => {
    const errorMessage = searchParams.get('error');
    if (errorMessage) {
      toast.error(errorMessage);
      router.replace('/login');
    }
  }, [router, searchParams]);

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
