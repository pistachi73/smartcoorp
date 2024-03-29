import Link from 'next/link';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceS } from '@smartcoorp/ui/tokens';

import { GoogleButton } from '../components/google-button';
import { Or } from '../components/or';
import { FormContainer } from '../credential-pages.styles';

import { LoginForm } from './login-form';

export const Login = () => {
  return (
    <FormContainer>
      <div>
        <Headline
          size="large"
          sizeWide="xlarge"
          noMargin
          style={{
            marginBottom: spaceS,
          }}
        >
          Welcome back!
        </Headline>
        <Body size="xsmall" sizeWide="small" noMargin variant="neutral">
          Enter your credentials and start typing
        </Body>
      </div>
      <GoogleButton action="login" />
      <Or />
      <LoginForm />
      <Body size="xsmall" sizeWide="small" noMargin variant="neutral">
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </Body>
    </FormContainer>
  );
};
