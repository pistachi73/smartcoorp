import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';

import { DeleteAccountField } from '../account-form-fields/delete-account-field';
import { useDeleteAccount } from '../account.hooks';

const mockUserId = 'f863384294';
const mockMutate = jest.fn();

jest.mock('../account.hooks');
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      id: mockUserId,
    },
  }),
}));

(useDeleteAccount as jest.Mock).mockReturnValue({
  mutate: mockMutate,
});

describe('<DeleteAccountField />', () => {
  beforeEach(() => {
    render(<DeleteAccountField />);
  });
  it('should render the component ', () => {
    expect(
      screen.getByRole('heading', { name: 'Delete account' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Deleting your account will permanently remove all your data and cannot be undone.'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'Delete account' })
    ).toBeInTheDocument();
  });

  it('should open modal', () => {
    const button = screen.getByRole('button', { name: 'Delete account' });
    fireEvent.click(button);
    expect(
      screen.getByText('This action cannot be undone.')
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
  });

  it('should enable delete button ', () => {
    const button = screen.getByRole('button', { name: 'Delete account' });
    fireEvent.click(button);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'permanently delete' } });
    expect(screen.getByRole('button', { name: 'Delete' })).toBeEnabled();
  });

  it("should delete account if user types 'permanently delete' and click 'Delete' button", async () => {
    const button = screen.getByRole('button', { name: 'Delete account' });
    fireEvent.click(button);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'permanently delete' } });
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({ userId: mockUserId });
    });
  });
});
