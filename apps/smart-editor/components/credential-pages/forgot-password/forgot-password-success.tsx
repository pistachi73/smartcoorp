import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceS } from '@smartcoorp/ui/tokens';

import { FormContainer } from '../credential-pages.styles';

export const ForgotPasswordSuccess = () => {
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
          Password reset email sent
        </Headline>
        <Body size="xsmall" sizeWide="small" noMargin variant="neutral">
          Check your inbox for instructions to complete the password reset
          process
        </Body>
      </div>
      <Button variant="secondary" to="/login">
        Back to login
      </Button>
    </FormContainer>
  );
};
