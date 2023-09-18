import { getServerSession } from 'next-auth';

import Link from 'next/link';
import { redirect } from 'next/navigation';

import { nextAuthOptions } from '@smartcoorp/smart-api';
import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { FormField } from '@smartcoorp/ui/form-field';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceS, spaceXL } from '@smartcoorp/ui/tokens';

import { LoginForm } from './login-form';
import {
  Container,
  FormWrapper,
  GoogleButton,
  Illustration,
  IllustrationWrapper,
  IllustrationsContainer,
  Or,
} from './login.styles';

export const Login = async () => {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    // redirect('/');
  }

  return (
    <Container>
      <FormWrapper>
        <div>
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
          <GoogleButton variant="secondary">
            <img
              width={18}
              src="./external-logos/google-logo.svg"
              alt="Google Logo"
            />
            Log in with Google
          </GoogleButton>
          <Or>
            <div />
            <Body size="xsmall" sizeWide="small" noMargin variant="neutral">
              or
            </Body>
            <div />
          </Or>
          <LoginForm />
        </div>
      </FormWrapper>
      <IllustrationWrapper>
        <div
          style={{
            marginBottom: spaceXL,
          }}
        >
          <Headline
            size="large"
            sizeWide="xlarge"
            noMargin
            style={{
              marginBottom: spaceS,
              color: 'white',
            }}
          >
            The simplest way to write content
          </Headline>
          <Body size="xsmall" sizeWide="small" noMargin variant="neutral">
            Enter your credentials and start typing
          </Body>
        </div>

        <IllustrationsContainer>
          <Illustration
            src="/credential-pages/login-min.webp"
            alt="Login illustration"
          />
        </IllustrationsContainer>
        {/* <EditorIllustration src="/credential-pages/login-1.webp" />
        <JsonIllustration src="/credential-pages/login-2.webp" /> */}
      </IllustrationWrapper>
    </Container>
  );
};
