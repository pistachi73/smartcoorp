import { MountOptions, mount as cypressMount } from 'cypress/react18';
import React, { ReactNode } from 'react';

import {
  GlobalStyles,
  Theme,
  ThemeProvider,
} from '@smartcoorp/ui/global-styles';
import { getCaretPosition, setCaretPosition } from '@smartcoorp/ui/post-editor';
import { gray900 } from '@smartcoorp/ui/tokens';

/* eslint-disable */
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      getByCyId: typeof getByCyId;
      undo: typeof undo;
      redo: typeof redo;
      setCaretPosition: typeof setCaretPositionCommand;
      getCaretPosition: typeof getCaretPositionCommand;
    }
  }
}

const noLogOptions = { log: false };

const setCaretPositionCommand = (selector: string, position: number) => {
  Cypress.log({
    displayName: 'Set Caret Position',
    message: position,
  });
  return cy
    .get(selector)
    .then(($el) => {
      const el = $el[0];
      setCaretPosition({ element: el, position });
    })
    .focus(noLogOptions);
};

const getCaretPositionCommand = () => {
  Cypress.log({
    displayName: 'Get Caret Position',
  });

  return cy.focused().then(($el) => {
    const element = $el[0];
    return getCaretPosition(element);
  });
};

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

const undo = () => {
  Cypress.log({
    displayName: 'Undo',
    message: 'Control + Z',
  });
  cy.wait(101);
  return cy.focused(noLogOptions).type('{meta}z', noLogOptions);
};

const redo = () => {
  Cypress.log({
    displayName: 'Redo',
    message: 'Control + Shift + Z',
  });
  cy.wait(101);
  return cy.focused(noLogOptions).type('{ctrl}{shift}z', noLogOptions);
};

Cypress.Commands.add('mount', mount);
Cypress.Commands.add('undo', undo);
Cypress.Commands.add('redo', redo);
Cypress.Commands.add('setCaretPosition', setCaretPositionCommand);
Cypress.Commands.add('getCaretPosition', getCaretPositionCommand);
Cypress.Commands.add('getByCyId', { prevSubject: false }, getByCyId);
