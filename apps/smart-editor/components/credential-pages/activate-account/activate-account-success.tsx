import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceS } from '@smartcoorp/ui/tokens';

import { FormContainer } from '../credential-pages.styles';

export const ActivateAccountSuccess = () => {
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
          Account activated!
        </Headline>
        <Body size="xsmall" sizeWide="small" noMargin variant="neutral">
          Congratulations, your SmartEditor account has been successfully
          verified.
        </Body>
      </div>
      <Button variant="secondary" to="/login">
        Back to login
      </Button>
    </FormContainer>
  );
};
