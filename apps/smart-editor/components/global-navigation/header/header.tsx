import Link from 'next/link';

import { Button } from '@smartcoorp/ui/button';

import {
  AccountButtonsContainer,
  HeaderContainer,
  StyledWidthLimiter,
} from './header.styles';

export const Header = () => {
  return (
    <HeaderContainer>
      <StyledWidthLimiter>
        <Button to="/" variant="text">
          <img
            width={80}
            src={'logo_by_pul_light.svg'}
            alt="SmartEditor Logo"
          />
        </Button>
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
