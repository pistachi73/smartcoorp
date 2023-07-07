'use client';

import { ThemeProvider } from '@smartcoorp/ui/global-styles';

import StyledComponentsRegistry from './lib/registry';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={'light'}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
}
