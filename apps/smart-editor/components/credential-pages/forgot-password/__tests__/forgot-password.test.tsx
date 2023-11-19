import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';

import { ForgotPassword } from '../forgot-password';
import { useSendForgotPasswordEmail } from '../forgot-password.hooks';

const validEmail = 'test@test.com';

const clickResetPasswordButton = () =>
  fireEvent.click(screen.getByRole('button', { name: /Reset Password/i }));
const typeInput = ({ field, value }: { field: string; value: string }) =>
  fireEvent.change(screen.getByLabelText(field), {
    target: { value },
  });

jest.mock('sonner');
jest.mock('../forgot-password.hooks');

const mockMutate = jest.fn();
(useSendForgotPasswordEmail as jest.Mock).mockReturnValue({
  mutate: mockMutate,
});

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

  it('should call sendForgotPasswordEmail when the form is submitted and the email is valid', async () => {
    typeInput({ field: 'Email', value: validEmail });
    clickResetPasswordButton();
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        email: validEmail,
      });
    });
  });
});
