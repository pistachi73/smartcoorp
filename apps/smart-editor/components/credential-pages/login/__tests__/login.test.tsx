import { AuthorizeError } from '@smart-editor/utils/next-auth-config';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

import { useRouter, useSearchParams } from 'next/navigation';

import { Login } from '../login';

const validEmail = 'test@test.com';
const validPassword = '1Abcdefgh+';

const invalidEmail = 'test';

const clickLoginButton = () =>
  fireEvent.click(screen.getByRole('button', { name: 'Login' }));
const typeInput = ({ field, value }: { field: string; value: string }) =>
  fireEvent.change(screen.getByLabelText(field), {
    target: { value },
  });

jest.mock('next-auth/react');
jest.mock('sonner');
jest.mock('next/navigation');

const pushMock = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: pushMock,
});

(useSearchParams as jest.Mock).mockReturnValue({
  get: jest.fn(),
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<Login />', () => {
  describe('Form validation', () => {
    it('should show an error when the email is invalid', async () => {
      render(<Login />);

      typeInput({ field: 'Email', value: invalidEmail });
      clickLoginButton();

      expect(
        await screen.findByText('Email address must be a valid address')
      ).toBeInTheDocument();
    });

    it('should show an error when the email or password are not present', async () => {
      render(<Login />);

      clickLoginButton();

      expect(await screen.findByText('Email is required')).toBeInTheDocument();
      expect(
        await screen.findByText('Password is required')
      ).toBeInTheDocument();
    });
  });
  it('should render the expected content', () => {
    render(<Login />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Forgot password?' })
    ).toBeInTheDocument();

    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sign up' })).toHaveAttribute(
      'href',
      '/signup'
    );
  });

  it('should redirect on successful login', async () => {
    (signIn as jest.Mock).mockReturnValue({});

    render(<Login />);

    typeInput({ field: 'Email', value: validEmail });
    typeInput({ field: 'Password', value: validPassword });
    clickLoginButton();

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledTimes(1);
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: validEmail,
        password: validPassword,
        redirect: false,
      });
    });

    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('/posts');
  });

  describe('<Login /> Errors', () => {
    const triggerLoginError = async (error: string) => {
      (signIn as jest.Mock).mockReturnValue({
        error,
      });
      render(<Login />);

      typeInput({ field: 'Email', value: validEmail });
      typeInput({ field: 'Password', value: validPassword });
      clickLoginButton();

      await waitFor(() => {
        expect(signIn).toHaveBeenCalledTimes(1);
        expect(signIn).toHaveBeenCalledWith('credentials', {
          email: validEmail,
          password: validPassword,
          redirect: false,
        });
      });
    };

    it("should trigger toast error on login fail with '403' error", async () => {
      const error: AuthorizeError = {
        code: 403,
        message: 'Error',
        data: {
          email: 'mockEmail',
          name: 'mockName',
          id: 'mockId',
        },
      };

      await triggerLoginError(JSON.stringify(error));

      expect(toast.error).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith('Error', {
        action: {
          label: 'Resend email',
          onClick: expect.any(Function),
        },
      });
    });

    it("should trigger toast error on login fail with '401' error", async () => {
      const error = {
        code: 401,
        message: 'Error',
      };

      await triggerLoginError(JSON.stringify(error));

      expect(toast.error).toHaveBeenCalledTimes(1);
      expect(toast.error).toHaveBeenCalledWith('Error');
    });
  });
});
