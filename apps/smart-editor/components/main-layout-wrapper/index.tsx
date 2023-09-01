'use client';

import StyledComponentsRegistry from '@smart-editor/components/registry';
import { TrpcProvider } from '@smart-editor/components/trpc';
import { SessionProvider } from 'next-auth/react';

import { GlobalStyles, ThemeProvider } from '@smartcoorp/ui/global-styles';

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
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
