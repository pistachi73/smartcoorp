import React from 'react';

import type { Theme } from '@smartcoorp/ui/global-styles';
import {
  Modal,
  ModalContent,
  ModalControl,
  ModalTrigger,
} from '@smartcoorp/ui/modal';

const modalContentCyId = 'modal-content';
const modalTriggerCyId = 'modal-trigger';
const onOpenChange = () => {};

const renderModal = (
  {
    modalControl,
    closeIcon,
  }: { modalControl?: ModalControl; closeIcon?: boolean } = {},
  theme?: Theme
) => {
  cy.mount(
    <Modal {...modalControl}>
      <ModalTrigger data-cy={modalTriggerCyId}>Trigger</ModalTrigger>
      <ModalContent
        title="title"
        description="description"
        closeIcon={closeIcon}
      >
        <p data-cy={modalContentCyId}>Modal Content</p>
      </ModalContent>
    </Modal>,

    { theme }
  );
};

describe('<Modal />', () => {
  it('should render modal when show is true', () => {
    renderModal({
      modalControl: {
        open: true,
        onOpenChange,
      },
    });
    cy.getByCyId(modalContentCyId).should('exist').and('be.visible');
  });

  it('should not render modal when show is false', () => {
    renderModal({
      modalControl: {
        open: false,
        onOpenChange,
      },
    });
    cy.getByCyId(modalContentCyId).should('not.exist');
  });

  it('should open modal when trigger is clicked', () => {
    renderModal();
    cy.getByCyId('modal-trigger').click();
    cy.getByCyId(modalContentCyId).should('exist').and('be.visible');
  });

  it('should render closeIcon', () => {
    renderModal({
      closeIcon: true,
    });
    cy.getByCyId('modal-trigger').click();
    cy.getByCyId('modal-close-icon').should('exist').and('be.visible');
  });

  it('should not render closeIcon', () => {
    renderModal({
      closeIcon: false,
    });
    cy.getByCyId('modal-trigger').click();
    cy.getByCyId('modal-close-icon').should('not.exist');
  });
});
