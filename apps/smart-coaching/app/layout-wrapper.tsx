'use client';

import { TrpcProvider } from '@smart-coaching/utils/trpc';
import { SessionProvider } from 'next-auth/react';

import { GlobalStyles, ThemeProvider } from '@smartcoorp/ui/global-styles';

import StyledComponentsRegistry from './lib/registry';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <TrpcProvider>
      <SessionProvider>
        <ThemeProvider theme={'light'}>
          <StyledComponentsRegistry>
            <GlobalStyles />
            {children}
          </StyledComponentsRegistry>
        </ThemeProvider>
      </SessionProvider>
    </TrpcProvider>
  );
}
