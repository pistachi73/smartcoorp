import Image from 'next/image';

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
          <Image
            width={80}
            height={36.36}
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
