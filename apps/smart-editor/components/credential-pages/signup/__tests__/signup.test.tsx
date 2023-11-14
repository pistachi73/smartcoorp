import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';

import { Signup } from '../signup';
import { useSignUp } from '../signup.hooks';

const validEmail = 'test@test.com';
const validPassword = '1Abcdefgh+';
const invalidEmail = 'test';

const clickSignupButton = () =>
  fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));
const typeInput = ({ field, value }: { field: string; value: string }) =>
  fireEvent.change(screen.getByLabelText(field), {
    target: { value },
  });

jest.mock('../signup.hooks');

const mockMutate = jest.fn();
(useSignUp as jest.Mock).mockReturnValue({
  mutate: mockMutate,
});

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

  it('should call signUp when the form is submitted and the data is valid', async () => {
    typeInput({ field: 'Email', value: validEmail });
    typeInput({ field: 'Password', value: validPassword });
    typeInput({ field: 'Name', value: 'test' });
    clickSignupButton();

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        email: validEmail,
        password: validPassword,
        name: 'test',
      });
    });
  });
});
