import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';

import { useParams } from 'next/navigation';

import { ResetPassword } from '../reset-password';
import { useResetPassword } from '../reset-password.hooks';

const validPassword = 'Password1!+';

const clickResetPasswordButton = () =>
  fireEvent.click(screen.getByRole('button', { name: /Set new Password/i }));
const typeInput = ({ field, value }: { field: string; value: string }) =>
  fireEvent.change(screen.getByLabelText(field), {
    target: { value },
  });

jest.mock('next/navigation');
jest.mock('../reset-password.hooks');

const mockToken = 'token';
(useParams as jest.Mock).mockReturnValue({
  token: mockToken,
});

const mockMutate = jest.fn();
(useResetPassword as jest.Mock).mockReturnValue({
  mutate: mockMutate,
});

describe('<ResetPassword />', () => {
  beforeEach(() => {
    render(<ResetPassword />);
  });

  describe('Form validation', () => {
    it('should show an error when the password is invalid', async () => {
      clickResetPasswordButton();

      expect(
        await screen.findByText('Password is required')
      ).toBeInTheDocument();

      expect(
        await screen.findByText('Please confirm your password')
      ).toBeInTheDocument();
    });

    it('should show an error when the password is invalid', async () => {
      typeInput({ field: 'Password', value: 'test' });
      clickResetPasswordButton();
      expect(
        await screen.findByText(
          'Password must be at least 8 characters long, contain at least one uppercase letter, one number and one special character'
        )
      ).toBeInTheDocument();
    });

    it('should show an error when the confirm password is invalid', async () => {
      typeInput({ field: 'Confirm password', value: 'test' });

      clickResetPasswordButton();
      expect(
        await screen.findByText('Your passwords do no match')
      ).toBeInTheDocument();
    });
  });
  it('should render the expected content', () => {
    screen.getByText(/Set new Password/i);
    screen.getByText(/Enter your new password for your account/i);

    expect(
      screen.getByRole('link', { name: /Back to login/i })
    ).toHaveAttribute('href', '/login');
  });

  it('should call resetPassword when the form is submitted and the password is valid', async () => {
    typeInput({ field: 'Password', value: validPassword });
    typeInput({ field: 'Confirm password', value: validPassword });
    clickResetPasswordButton();
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        token: mockToken,
        password: validPassword,
        confirmPassword: validPassword,
      });
    });
  });
});
