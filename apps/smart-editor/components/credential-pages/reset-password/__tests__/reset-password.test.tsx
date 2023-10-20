import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';
import { toast } from 'sonner';

import { useParams, useRouter } from 'next/navigation';

import { resetPasswordAction } from '../action';
import { ResetPassword } from '../reset-password';

const validPassword = 'Password1!+';

const clickResetPasswordButton = () =>
  fireEvent.click(screen.getByRole('button', { name: /Set new Password/i }));
const typeInput = ({ field, value }: { field: string; value: string }) =>
  fireEvent.change(screen.getByLabelText(field), {
    target: { value },
  });

jest.mock('sonner');
jest.mock('next/navigation');
jest.mock('../action');

const mockToken = 'token';
const pushMock = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: pushMock,
});
(useParams as jest.Mock).mockReturnValue({
  token: mockToken,
});

const mockResetPasswordAction = resetPasswordAction as jest.Mock;

describe('<ResetPassword />', () => {
  beforeEach(() => {
    render(<ResetPassword />);
  });

  describe('Form validation', () => {
    it('should show an error when the password is invalid', async () => {
      clickResetPasswordButton();

      expect(await screen.findAllByText('Password is required')).toHaveLength(
        2
      );
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
        await screen.findByText(
          'Password must be at least 8 characters long, contain at least one uppercase letter, one number and one special character'
        )
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

  it('should throw error if resetPasswordAction threw error', async () => {
    const error = 'error';
    mockResetPasswordAction.mockResolvedValueOnce({
      error,
    });

    typeInput({ field: 'Password', value: validPassword });
    typeInput({ field: 'Confirm password', value: validPassword });

    clickResetPasswordButton();

    await waitFor(() => {
      expect(mockResetPasswordAction).toHaveBeenCalledTimes(1);
      expect(mockResetPasswordAction).toHaveBeenCalledWith(
        {
          password: validPassword,
          confirmPassword: validPassword,
        },
        mockToken
      );
    });

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith(error);
  });

  it('should redirect to /login if resetPasswordAction was successful', async () => {
    mockResetPasswordAction.mockResolvedValueOnce({});

    typeInput({ field: 'Password', value: validPassword });
    typeInput({ field: 'Confirm password', value: validPassword });
    clickResetPasswordButton();

    await waitFor(() => {
      expect(mockResetPasswordAction).toHaveBeenCalledTimes(1);
      expect(mockResetPasswordAction).toHaveBeenCalledWith(
        {
          password: validPassword,
          confirmPassword: validPassword,
        },
        'token'
      );
    });

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('/login');
  });
});
