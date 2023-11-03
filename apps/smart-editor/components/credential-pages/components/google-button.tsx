'use client';

import { signIn } from 'next-auth/react';

import { GoogleButton as StyledGoogleButton } from '../credential-pages.styles';

type GoogleButtonProps = {
  action: 'login' | 'signup';
};

export const GoogleButton = ({ action }: GoogleButtonProps) => {
  const actionText = action === 'login' ? 'Log in' : 'Sign up';

  return (
    <StyledGoogleButton
      onClick={() => {
        signIn('google', { redirect: false, callbackUrl: '/posts' });
      }}
      variant="secondary"
    >
      <img
        width={18}
        src="./external-logos/google-logo.svg"
        alt="Google Logo"
      />
      {actionText} with Google
    </StyledGoogleButton>
  );
};
