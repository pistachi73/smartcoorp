'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { RHFFormField } from '@smartcoorp/ui/form-field';
import { spaceXL } from '@smartcoorp/ui/tokens';

export const forgotPasswordSchema = z.object({
  password: z.string().min(4).max(12),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm = () => {
  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      password: '',
    },
  });

  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    router.push('/forgot-password/success');
    // setLoading(true);
    // const response = await signIn('credentials', {
    //   ...data,
    //   redirect: false,
    // });
    // console.log({ response });
    // if (response?.error) {
    //   toast.error('Invalid credentials');
    // } else {
    //   router.push('/');
    // }
    // setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFFormField
        label="Password"
        name="password"
        control={control}
        //   isDisabled={loading}
        type="password"
        rules={{
          required: 'Password is required',
        }}
      />
      <Button type="submit">Reset Password</Button>
      {/* <Link href="/login">Back to login</Link> */}
    </form>
  );
};
