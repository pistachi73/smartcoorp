'use client';

import StyledComponentsRegistry from '@smart-editor/components/registry';
import { TrpcProvider } from '@smart-editor/components/trpc';
import { SessionProvider } from 'next-auth/react';

import { GlobalStyles, ThemeProvider } from '@smartcoorp/ui/global-styles';

import { darkTheme, lightTheme } from '../../theme/theme';

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <TrpcProvider>
      <SessionProvider>
        <ThemeProvider
          theme={'light'}
          darkTheme={darkTheme}
          lightTheme={lightTheme}
        >
          <StyledComponentsRegistry>
            <GlobalStyles />
            {children}
          </StyledComponentsRegistry>
        </ThemeProvider>
      </SessionProvider>
    </TrpcProvider>
  );
}
