import Link from 'next/link';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceS } from '@smartcoorp/ui/tokens';

import { FormContainer } from '../credential-pages.styles';

import { ForgotPasswordForm } from './forgot-password-form';

export const ForgotPassword = () => {
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
          Forgot password
        </Headline>
        <Body size="xsmall" sizeWide="small" noMargin variant="neutral">
          Enter your email, and we will send you instructions on how to reset
          your password
        </Body>
      </div>

      <ForgotPasswordForm />
      <Link href="/login">
        <Body size="xsmall" sizeWide="small" noMargin variant="neutral">
          Back to login
        </Body>
      </Link>
    </FormContainer>
  );
};
