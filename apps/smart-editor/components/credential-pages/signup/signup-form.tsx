'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

import { Button } from '@smartcoorp/ui/button';
import { RHFFormField } from '@smartcoorp/ui/form-field';

import {
  type SignupFormData,
  emailnputValidator,
  passwordInputValidator,
} from '../helpers';

import { signupAction } from './action';

export const SignupForm = () => {
  const { control, handleSubmit } = useForm<SignupFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);

    const { error } = await signupAction(data);

    if (error) {
      toast.error(error);
      setLoading(false);
    } else {
      router.push('/signup/success');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFFormField
        label="Name"
        name="name"
        control={control}
        isDisabled={loading}
        rules={{
          required: 'Name is required',
        }}
      />
      <RHFFormField
        label="Email"
        name="email"
        control={control}
        isDisabled={loading}
        rules={emailnputValidator}
      />
      <RHFFormField
        label="Password"
        name="password"
        control={control}
        isDisabled={loading}
        type="password"
        rules={passwordInputValidator}
      />
      <Button type="submit" loading={loading}>
        Sign up
      </Button>
    </form>
  );
};
