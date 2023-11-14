'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@smartcoorp/ui/button';
import { RHFFormField } from '@smartcoorp/ui/form-field';

import {
  type SignupFormData,
  emailnputValidator,
  passwordInputValidator,
} from '../helpers';

import { useSignUp } from './signup.hooks';

export const SignupForm = () => {
  const { control, handleSubmit } = useForm<SignupFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { mutate: signUp, isLoading } = useSignUp();

  const onSubmit = async (data: SignupFormData) => {
    await signUp(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFFormField
        label="Name"
        name="name"
        control={control}
        isDisabled={isLoading}
        rules={{
          required: 'Name is required',
        }}
      />
      <RHFFormField
        label="Email"
        name="email"
        control={control}
        isDisabled={isLoading}
        rules={emailnputValidator}
      />
      <RHFFormField
        label="Password"
        name="password"
        control={control}
        isDisabled={isLoading}
        type="password"
        rules={passwordInputValidator}
      />
      <Button type="submit" loading={isLoading}>
        Sign up
      </Button>
    </form>
  );
};
