'use client';

import StyledComponentsRegistry from '@smart-editor/components/registry';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';

import { GlobalStyles, ThemeProvider } from '@smartcoorp/ui/global-styles';

import { darkTheme, lightTheme } from '../../theme/theme';

import { ToasterRenderer } from './toaster-renderer';

export function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <ThemeProvider
          theme={'light'}
          darkTheme={darkTheme}
          lightTheme={lightTheme}
        >
          <StyledComponentsRegistry>
            <GlobalStyles />
            <ToasterRenderer />
            {children}
          </StyledComponentsRegistry>
        </ThemeProvider>
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
