import Link from 'next/link';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceS } from '@smartcoorp/ui/tokens';

import { FormContainer } from '../credential-pages.styles';

import { ResetPasswordForm } from './reset-password-form';

export const ResetPassword = () => {
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
          Password Reset
        </Headline>
        <Body size="xsmall" sizeWide="small" noMargin variant="neutral">
          Enter your new password for your account
        </Body>
      </div>

      <ResetPasswordForm />
      <Link href="/login">
        <Body size="xsmall" sizeWide="small" noMargin variant="neutral">
          Back to login
        </Body>
      </Link>
    </FormContainer>
  );
};
