'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ILogin } from '@smartcoorp/smart-api';
import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { RHFFormField } from '@smartcoorp/ui/form-field';
import { Headline } from '@smartcoorp/ui/headline';

import {
  InputContainer,
  LoginContainer,
  LoginForm,
  LogoContainer,
} from './login.styles';

export const Login = () => {
  const { control, handleSubmit } = useForm<ILogin>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (data: ILogin) => {
    setLoading(true);

    const response = await signIn('admin-credentials', {
      ...data,
      redirect: false,
    });

    console.log({ response });
    if (response?.error) {
      setError('Invalid credentials');
    } else {
      console.log('HOla');
      router.push('/home');
    }

    setLoading(false);
  };

  return (
    <LoginContainer onSubmit={handleSubmit(onSubmit)}>
      <LoginForm>
        <LogoContainer>
          <Image src="/big-logo-inverted.svg" alt="Smart Admin" fill />
        </LogoContainer>
        <Headline size="xxlarge" noMargin style={{ marginBottom: '4px' }}>
          Sign in
        </Headline>
        <Body variant="neutral" size="xsmall">
          Welcome to Smart Admin
        </Body>
        <InputContainer>
          <RHFFormField
            id="login-email"
            label="Email"
            type="email"
            placeholder="Type your email..."
            name="email"
            control={control}
            rules={{ required: 'This field is required' }}
          />
        </InputContainer>
        <InputContainer>
          <RHFFormField
            id="login-password"
            label="Password"
            name="password"
            type="password"
            placeholder="Type your password..."
            control={control}
            rules={{ required: 'This field is required' }}
          />
        </InputContainer>
        {error && (
          <Body size="xsmall" variant="error">
            {error}
          </Body>
        )}
        <Button style={{ width: '100%' }} loading={loading}>
          Login
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};
