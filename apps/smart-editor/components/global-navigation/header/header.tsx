import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { getServerSession } from 'next-auth';

import Image from 'next/image';

import { Button } from '@smartcoorp/ui/button';

import {
  AccountButtonsContainer,
  HeaderContainer,
  StyledWidthLimiter,
} from './header.styles';

export const Header = async () => {
  const session = await getServerSession(nextAuthConfig);
  return (
    <HeaderContainer>
      <StyledWidthLimiter>
        <Button
          to="/"
          variant="text"
          style={{
            padding: '0px',
          }}
        >
          <Image
            width={80}
            height={36.36}
            src={'logo_by_pul_light.svg'}
            alt="SmartEditor Logo"
          />
        </Button>
        <AccountButtonsContainer>
          {session?.id ? (
            <Button variant="secondary" size="small" to="/posts">
              Go to dashboard
            </Button>
          ) : (
            <>
              <Button variant="text" size="small" to="/login">
                Log in
              </Button>
              <Button size="small" to="/signup">
                Get Started
              </Button>
            </>
          )}
        </AccountButtonsContainer>
      </StyledWidthLimiter>
    </HeaderContainer>
  );
};
