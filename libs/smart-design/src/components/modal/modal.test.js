import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import ReactDom from 'react-dom';

import { render } from '../../test-utils';

import { Modal } from './modal';

const mockModalDescription = 'modal description';

const renderModal = ({ show = false, ...rest } = {}) => {
  render(
    <Modal
      show={show}
      rootId="portal"
      modalDescription={mockModalDescription}
      {...rest}
    >
      Modal content
    </Modal>
  );
};

beforeAll(() => {
  ReactDom.createPortal = jest.fn((element, node) => {
    return element;
  });
});

afterEach(() => {
  ReactDom.createPortal.mockClear();
  jest.clearAllMocks();
});

describe(`Modal`, () => {
  it('should not render modal when show is false', () => {
    renderModal();

    expect(screen.queryByTestId('Modal content')).not.toBeInTheDocument();
  });

  it('should render modal content', () => {
    renderModal({ show: true });

    expect(screen.getByText('Modal content')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAttribute(
      'aria-label',
      mockModalDescription
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-hidden', 'false');
  });

  it('should render closeIcon and trigger onClose ', () => {
    const mockOnClose = jest.fn();

    renderModal({ show: true, closeIcon: true, onClose: mockOnClose });

    expect(screen.getByText('Modal content')).toBeInTheDocument();

    expect(screen.getByTestId('close-modal-icon')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('close-modal-icon'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should toggle onClose when background is clicked', () => {
    const mockOnBackgroundClick = jest.fn();

    renderModal({ show: true, onBackgroundClick: mockOnBackgroundClick });

    fireEvent.click(screen.getByTestId('modal-background'));

    expect(mockOnBackgroundClick).toHaveBeenCalledTimes(1);
  });
});
