import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';
import { toast } from 'react-hot-toast';

import { useRouter } from 'next/navigation';

import { forgotPasswordAction } from '../action';
import { ForgotPassword } from '../forgot-password';

const validEmail = 'test@test.com';

const clickResetPasswordButton = () =>
  fireEvent.click(screen.getByRole('button', { name: /Reset Password/i }));
const typeInput = ({ field, value }: { field: string; value: string }) =>
  fireEvent.change(screen.getByLabelText(field), {
    target: { value },
  });

jest.mock('react-hot-toast');
jest.mock('next/navigation');
jest.mock('../action');

const pushMock = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: pushMock,
});

const mockForgotPasswordAction = forgotPasswordAction as jest.Mock;

describe('<ForgotPassword />', () => {
  beforeEach(() => {
    render(<ForgotPassword />);
  });
  describe('Form validation', () => {
    it('should show an error when the email is invalid', async () => {
      clickResetPasswordButton();
      expect(await screen.findByText('Email is required')).toBeInTheDocument();
    });

    it('should show an error when the email is invalid', async () => {
      typeInput({ field: 'Email', value: 'test@t' });
      clickResetPasswordButton();
      expect(
        await screen.findByText('Email address must be a valid address')
      ).toBeInTheDocument();
    });
  });

  it('should render the expected content', () => {
    expect(screen.getByText(/Forgot password/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Enter your email, and we will send you instructions on how to reset your password/i
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset Password/i }));
    expect(
      screen.getByRole('link', { name: /Back to login/i })
    ).toHaveAttribute('href', '/login');
  });

  it('should throw error if forgotPasswordAction threw error', async () => {
    const error = 'error';
    mockForgotPasswordAction.mockResolvedValueOnce({
      error,
    });

    typeInput({ field: 'Email', value: validEmail });
    clickResetPasswordButton();

    await waitFor(() => {
      expect(mockForgotPasswordAction).toHaveBeenCalledTimes(1);
      expect(mockForgotPasswordAction).toHaveBeenCalledWith({
        email: validEmail,
      });
    });

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith(error);
  });

  it('should redirect to /forgot-password/success if forgotPasswordAction was successful', async () => {
    mockForgotPasswordAction.mockResolvedValueOnce({});

    typeInput({ field: 'Email', value: validEmail });
    clickResetPasswordButton();

    await waitFor(() => {
      expect(mockForgotPasswordAction).toHaveBeenCalledTimes(1);
      expect(mockForgotPasswordAction).toHaveBeenCalledWith({
        email: validEmail,
      });
    });

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('/forgot-password/success');
  });
});
