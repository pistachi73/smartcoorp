import ReactDom from 'react-dom';

import { fireEvent, render, screen } from '../../test-utils';

import { Dialog } from './dialog';

const mockConfirmLabel = 'Confirm';
const mockDialogContent = 'Delete content';
const renderDialog = ({ show = true, ...rest } = {}) => {
  render(
    <Dialog show={show} confirmLabel={mockConfirmLabel} {...rest}>
      {mockDialogContent}
    </Dialog>
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

describe(`Dialog`, () => {
  it('should render confirmation and reject button button', () => {
    const mockRejectLabel = 'Reject';
    renderDialog({ rejectLabel: mockRejectLabel });

    expect(
      screen.getByRole('button', { name: mockConfirmLabel })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: mockRejectLabel })
    ).toBeInTheDocument();
  });

  it('should trigger onConfirm when confirm button clicked', () => {
    const mockOnConfirm = jest.fn();
    renderDialog({ onConfirm: mockOnConfirm });

    fireEvent.click(screen.getByRole('button', { name: mockConfirmLabel }));

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('should trigger onReject when reject button clicked', () => {
    const mockOnReject = jest.fn();
    const mockRejectLabel = 'Reject';

    renderDialog({ onReject: mockOnReject, rejectLabel: mockRejectLabel });

    fireEvent.click(screen.getByRole('button', { name: mockRejectLabel }));

    expect(mockOnReject).toHaveBeenCalledTimes(1);
  });

  it('should not trigger onBackgroundClick or onClose when loading', () => {
    const mockOnBackgroundClick = jest.fn();
    const mockOnClose = jest.fn();

    renderDialog({
      onBackgroundClick: mockOnBackgroundClick,
      onClose: mockOnClose,
      loading: true,
      closeIcon: true,
    });

    fireEvent.click(screen.getByTestId('modal-background'));

    expect(mockOnBackgroundClick).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByTestId('close-modal-icon'));

    expect(mockOnClose).toHaveBeenCalledTimes(0);
  });
});
