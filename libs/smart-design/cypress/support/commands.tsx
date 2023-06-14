import { MountOptions, mount as cypressMount } from 'cypress/react18';
import React, { ReactNode } from 'react';

import {
  GlobalStyles,
  Theme,
  ThemeProvider,
} from '@smartcoorp/ui/global-styles';

import { gray900 } from '../../src/tokens/color';

export {};
/* eslint-disable */
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      getByCyId: typeof getByCyId;
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
const getByCyId = (id: string) => cy.get(`[data-cy="${id}"]`);

Cypress.Commands.add('mount', mount);
Cypress.Commands.add('getByCyId', { prevSubject: false }, getByCyId);
