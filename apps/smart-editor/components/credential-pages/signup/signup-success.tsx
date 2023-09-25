import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceS } from '@smartcoorp/ui/tokens';

import { FormContainer } from '../credential-pages.styles';

export const SignupSuccess = () => {
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
          Account Created Successfully
        </Headline>
        <Body size="small" sizeWide="small" variant="neutral">
          An activation email has been sent to the email address you provided
          during registration. Please check your email and follow the
          instructions to activate your account.
        </Body>

        <Body size="small" sizeWide="small" noMargin variant="neutral">
          If you don&apos;t receive the email within a few minutes, please check
          your spam folder.
        </Body>
      </div>
      <Button variant="secondary" to="/login">
        Back to login
      </Button>
    </FormContainer>
  );
};
