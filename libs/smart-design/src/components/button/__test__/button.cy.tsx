import React from 'react';

import type { Theme } from '../../../global-styles/theme/theme-provider';
import { Button } from '../button';
import type { ButtonProps } from '../button.types';

const renderButton = (
  props: ButtonProps,
  label = 'This is a test',
  theme?: Theme
) => {
  cy.mount(<Button {...props}>{label}</Button>, { theme });
};

describe('<Button />', () => {
  it('renders', () => {
    renderButton({ variant: 'primary' });
    cy.get('button').should('exist');
    cy.get('button').should('have.text', 'This is a test');
  });

  it('should render <Link> with relative path', () => {
    renderButton({ to: '/route1/route2' });

    cy.get('a').should('have.attr', 'href', '/route1/route2');
  });

  it('should render <a> external link', () => {
    const mockTarget = '_blank';
    renderButton({ href: 'https://google.es', target: mockTarget });

    cy.get('a').should('have.attr', 'href', 'https://google.es');
    cy.get('a').should('have.attr', 'target', mockTarget);
  });

  it('should render <button> and call callback function on Button click', () => {
    const mockCallback = cy.stub().as('onClick');
    renderButton({ onClick: mockCallback });

    cy.get('button').click();
    cy.get('@onClick').should('have.been.called');
  });

  it('should not render button children when loading', () => {
    renderButton({ loading: true });

    cy.get('[data-cy="button-text"]').should('not.be.visible');
    cy.get('[data-cy="dot-loading"]').should('exist');
  });
});
