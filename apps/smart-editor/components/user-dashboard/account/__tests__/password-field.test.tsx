import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';

import { PasswordField } from '../account-form-fields/password-form-field';
import { useUpdateField } from '../account.hooks';

const mockUserId = 'f863384294';
const validPassword = '1Abcdefgh+';
const invalidPassword = 'test';
const mockMutate = jest.fn();
const mockUpdateSession = jest.fn();

jest.mock('../account.hooks');
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      id: mockUserId,
    },
    update: mockUpdateSession,
  }),
}));

(useUpdateField as jest.Mock).mockReturnValue({
  mutate: mockMutate,
});

describe('<PasswordField />', () => {
  beforeEach(() => {
    render(<PasswordField />);
  });
  it('should render the component ', () => {
    expect(
      screen.getByRole('heading', { name: 'Password' })
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();

    expect(useUpdateField).toHaveBeenCalledWith({ field: 'password' });
  });

  it("should show errors if password doesn't match or password is invalid", async () => {
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');

    fireEvent.change(passwordInput, { target: { value: invalidPassword } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'wrongPassword' },
    });

    const button = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText('Your passwords do no match')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Password must be at least 8 characters long, contain at least one uppercase letter, one number and one special character'
        )
      ).toBeInTheDocument();
    });
  });

  it('should update password', async () => {
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');

    fireEvent.change(passwordInput, { target: { value: validPassword } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: validPassword },
    });

    const button = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        userId: mockUserId,
        data: {
          password: validPassword,
        },
      });
    });
  });
});
