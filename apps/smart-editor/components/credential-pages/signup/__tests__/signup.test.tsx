import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

import { signupAction } from '../action';
import { Signup } from '../signup';

const validEmail = 'test@test.com';
const validPassword = '1Abcdefgh+';
const invalidEmail = 'test';

const clickSignupButton = () =>
  fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));
const typeInput = ({ field, value }: { field: string; value: string }) =>
  fireEvent.change(screen.getByLabelText(field), {
    target: { value },
  });

jest.mock('sonner');
jest.mock('next/navigation');
jest.mock('../action');

const pushMock = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: pushMock,
});
const mockSignupAction = signupAction as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<Signup />', () => {
  beforeEach(() => {
    render(<Signup />);
  });
  describe('Form validation', () => {
    it('should show an error when the email is invalid', async () => {
      typeInput({ field: 'Email', value: invalidEmail });
      clickSignupButton();

      expect(
        await screen.findByText('Email address must be a valid address')
      ).toBeInTheDocument();
    });

    it('should show an error when the email or password or name are not present', async () => {
      clickSignupButton();

      expect(await screen.findByText('Email is required')).toBeInTheDocument();
      expect(
        await screen.findByText('Password is required')
      ).toBeInTheDocument();
      expect(await screen.findByText('Name is required')).toBeInTheDocument();
    });

    it('should show an error when the password is invalid', async () => {
      typeInput({ field: 'Password', value: 'test' });
      clickSignupButton();

      expect(
        await screen.findByText(
          'Password must be at least 8 characters long, contain at least one uppercase letter, one number and one special character'
        )
      ).toBeInTheDocument();
    });
  });

  it('should render the expected content', () => {
    expect(screen.getByText('Start crafting your story!')).toBeInTheDocument();
    expect(
      screen.getByText('Enter your credentials and start typing')
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
    expect(screen.getByText('Already a user?')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Log in' })).toHaveAttribute(
      'href',
      '/login'
    );
  });

  it('should redirect on successful signup', async () => {
    mockSignupAction.mockResolvedValueOnce({});
    typeInput({ field: 'Email', value: validEmail });
    typeInput({ field: 'Password', value: validPassword });
    typeInput({ field: 'Name', value: 'test' });
    clickSignupButton();

    await waitFor(() => {
      expect(mockSignupAction).toHaveBeenCalledTimes(1);
      expect(mockSignupAction).toHaveBeenCalledWith({
        email: validEmail,
        password: validPassword,
        name: 'test',
      });
    });
    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith('/signup/success');
  });

  it('should throw error if signupAction threw error', async () => {
    const error = 'error';
    mockSignupAction.mockResolvedValueOnce({
      error,
    });

    typeInput({ field: 'Email', value: validEmail });
    typeInput({ field: 'Password', value: validPassword });
    typeInput({ field: 'Name', value: 'test' });
    clickSignupButton();

    await waitFor(() => {
      expect(mockSignupAction).toHaveBeenCalledTimes(1);
    });

    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith(error);
  });
});
