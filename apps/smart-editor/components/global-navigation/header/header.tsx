import { Button } from '@smartcoorp/ui/button';

import {
  AccountButtonsContainer,
  HeaderContainer,
  StyledWidthLimiter,
} from './style';

export const Header = () => {
  return (
    <HeaderContainer>
      <StyledWidthLimiter>
        <img width={80} src={'logo_by_pul_light.svg'} alt="SmartEditor Logo" />
        <AccountButtonsContainer>
          <Button variant="text" size="small" to="/login">
            Log in
          </Button>
          <Button size="small" to="/signup">
            Get Started
          </Button>
        </AccountButtonsContainer>
      </StyledWidthLimiter>
    </HeaderContainer>
  );
};
