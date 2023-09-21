import Link from 'next/link';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceS } from '@smartcoorp/ui/tokens';

import { GoogleButton } from '../components/google-button';
import { Or } from '../components/or';
import { FormContainer } from '../credential-pages.styles';

import { SignupForm } from './signup-form';

export const Signup = () => {
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
          Start crafting your story!
        </Headline>
        <Body size="xsmall" sizeWide="small" noMargin variant="neutral">
          Enter your credentials and start typing
        </Body>
      </div>
      <GoogleButton action="signup" />
      <Or />
      <SignupForm />
      <Body size="xsmall" sizeWide="small" noMargin variant="neutral">
        Already a user? <Link href="/login">Log in</Link>
      </Body>
    </FormContainer>
  );
};
