/* eslint-disable import/export */
import { RenderOptions, render } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';

import { GlobalStyles, ThemeProvider } from '../global-styles';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme="light">
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
