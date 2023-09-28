import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceS } from '@smartcoorp/ui/tokens';

import { FormContainer } from '../credential-pages.styles';

export const ActivateAccountFail = () => {
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
          Account Verification Failed
        </Headline>
        <Body size="xsmall" sizeWide="small" noMargin variant="neutral">
          We&apos;re sorry, but we couldn&apos;t verify your account at this
          time.
        </Body>
      </div>
      <Button variant="secondary" to="/login">
        Back to login
      </Button>
    </FormContainer>
  );
};
