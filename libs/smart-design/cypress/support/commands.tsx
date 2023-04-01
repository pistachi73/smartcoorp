import { MountOptions, mount as cypressMount } from 'cypress/react18';
import React, { ReactNode } from 'react';

import { GlobalStyles, ThemeProvider } from '../../src/global-styles';
import { Theme } from '../../src/global-styles/theme/theme-provider';
import { gray900 } from '../../src/tokens/color';

export {};
/* eslint-disable */
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

const mount = (
  component: ReactNode,
  options?: MountOptions & { theme?: Theme }
) => {
  const theme = options?.theme ?? 'light';
  return cypressMount(
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme === 'light' ? 'white' : gray900,
        }}
      >
        {component}
      </div>
    </ThemeProvider>,
    options
  );
};

Cypress.Commands.add('mount', mount);
