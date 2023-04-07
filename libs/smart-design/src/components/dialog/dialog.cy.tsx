/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import type { Theme } from '../../global-styles/theme/theme-provider';

import { Dialog, DialogContent, DialogTrigger } from './dialog';
import type { DialogContentProps, DialogControl } from './dialog.types';

const modalContentCyId = 'dialog-content';
const modalTriggerCyId = 'dialog-trigger';
const openedDialog = {
  open: true,
  onOpenChange: () => {},
};
const renderDialog = (
  {
    dialogControl,
    dialogContentProps,
  }: {
    dialogControl?: DialogControl;
    dialogContentProps?: Partial<DialogContentProps>;
  } = {},
  theme?: Theme
) => {
  cy.mount(
    <Dialog {...dialogControl}>
      <DialogTrigger data-cy={modalTriggerCyId}>Trigger</DialogTrigger>
      <DialogContent
        title="title"
        description="description"
        actionLabel="Accept"
        onCancel={() => {}}
        onAction={() => {}}
        cancelLabel="Cancel"
        {...dialogContentProps}
      >
        <p data-cy={modalContentCyId}>Dialog Content</p>
      </DialogContent>
    </Dialog>,

    { theme }
  );
};

describe('<Dialog />', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onOpenChange = () => {};

  it('should render dialog when show is true', () => {
    renderDialog({
      dialogControl: openedDialog,
    });
    cy.getByCyId(modalContentCyId).should('exist').and('be.visible');
  });

  it('should not render dialog when show is false', () => {
    renderDialog({
      dialogControl: {
        open: false,
        onOpenChange,
      },
    });
    cy.getByCyId(modalContentCyId).should('not.exist');
  });

  it('should render action and cancel buttons and trigger onCancel and onAction', () => {
    const onCancel = cy.stub().as('onCancel');
    const onAction = cy.stub().as('onAction');
    renderDialog({
      dialogControl: openedDialog,
      dialogContentProps: {
        title: 'title',
        description: 'description',
        actionLabel: 'Accept',
        cancelLabel: 'Cancel',
        onCancel,
        onAction,
      },
    });
    cy.get('button').contains('Accept').should('exist');
    cy.get('button').contains('Cancel').should('exist');

    cy.get('button').contains('Accept').click();
    cy.get('@onAction').should('have.been.calledOnce');

    cy.get('button').contains('Cancel').click();
    cy.get('@onCancel').should('have.been.calledOnce');
  });

  it('should only render accept button', () => {
    renderDialog({
      dialogControl: openedDialog,
      dialogContentProps: {
        cancelLabel: undefined,
      },
    });

    cy.get('button').contains('Accept').should('exist');
    cy.get('button').contains('Cancel').should('not.exist');
  });

  it('should close dialog when no onCancel and no onAction provided', () => {
    const onOpenChange = cy.stub().as('onOpenChange');
    renderDialog({
      dialogControl: {
        open: true,
        onOpenChange,
      },
      dialogContentProps: {
        onAction: undefined,
        onCancel: undefined,
      },
    });

    cy.get('button').contains('Accept').click();
    cy.get('@onOpenChange')
      .should('have.been.calledOnce')
      .and('have.been.calledWith', false);

    cy.get('button').contains('Cancel').click();
    cy.get('@onOpenChange')
      .should('have.been.calledTwice')
      .and('have.been.calledWith', false);
  });

  it('should render disabled buttons when dialog loading', () => {
    renderDialog({
      dialogControl: openedDialog,
      dialogContentProps: {
        loading: true,
      },
    });

    cy.contains('button', 'Accept').should('be.disabled');
    cy.contains('button', 'Cancel').should('be.disabled');
  });
});
