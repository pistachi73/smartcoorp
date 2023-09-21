'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useRouter } from 'next/navigation';

import { Button } from '@smartcoorp/ui/button';
import { RHFFormField } from '@smartcoorp/ui/form-field';
import { spaceXL } from '@smartcoorp/ui/tokens';

export const resetPasswordSchema = z.object({
  password: z.string().min(4).max(12),
  confirmPassword: z.string().min(4).max(12),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordForm = () => {
  const { control, handleSubmit } = useForm<ResetPasswordFormData>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const router = useRouter();

  const onSubmit = async (data: ResetPasswordFormData) => {
    router.push('/');
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: spaceXL,
      }}
    >
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
      <RHFFormField
        label="Confirm password"
        name="confirmPassword"
        control={control}
        //   isDisabled={loading}
        type="password"
        rules={{
          required: 'Password is required',
        }}
      />
      <Button type="submit">Set new Password</Button>
    </form>
  );
};
