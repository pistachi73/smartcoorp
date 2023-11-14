import { sendAccountVerificationEmail } from '@smart-editor/actions/account.actions';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

import { EmailField } from '../account-form-fields/email-field';
import { useUpdateField } from '../account.hooks';

const mockUserId = 'f863384294';
const currentEmail = 'current@test.com';
const validEmail = 'test@test.com';
const invalidEmail = 'test';
const mockName = 'test';
const mockMutate = jest.fn();
const mockUpdateSession = jest.fn();

jest.mock('@smart-editor/actions/account.actions');
jest.mock('../account.hooks');
jest.mock('sonner');
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      id: mockUserId,
      user: {
        email: currentEmail,
        name: mockName,
      },
    },
    update: mockUpdateSession,
  }),
}));

(useUpdateField as jest.Mock).mockReturnValue({
  mutate: mockMutate,
});

describe('<EmailField />', () => {
  beforeEach(() => {
    render(<EmailField email={currentEmail} isGoogleUser={false} />);
  });
  it('should render the component ', () => {
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Please enter the email address you want to use to log in with SmartEditor.'
      )
    ).toBeInTheDocument();

    expect(screen.getByRole('textbox')).toHaveValue(currentEmail);

    expect(useUpdateField).toHaveBeenCalledWith({ field: 'email' });
  });
  it('should render the component if is google user', () => {
    render(<EmailField email={currentEmail} isGoogleUser={true} />);

    expect(
      screen.getByText(
        'You are using Google to log in. You cannot change your email address.'
      )
    ).toBeInTheDocument();
  });

  it('should throw error if email is invalid', async () => {
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: invalidEmail } });

    const button = screen.getByRole('button', { name: 'Save' });

    fireEvent.click(button);

    expect(
      await screen.findByText('Email address must be a valid address')
    ).toBeInTheDocument();
  });

  it('should throw error if email is the same', async () => {
    const button = screen.getByRole('button', { name: 'Save' });

    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Email is the same');
    });
  });

  it('should update email', async () => {
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: validEmail } });
    const button = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        userId: mockUserId,
        data: {
          email: validEmail,
          accountVerified: false,
        },
      });
    });

    expect(mockUpdateSession).toHaveBeenCalledWith({
      email: validEmail,
    });

    expect(sendAccountVerificationEmail).toHaveBeenCalledWith({
      email: validEmail,
      userId: mockUserId,
      name: mockName,
    });
  });

  it("should show error if verification email can't be sent", async () => {
    (sendAccountVerificationEmail as jest.Mock).mockRejectedValueOnce({});

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: validEmail } });
    const button = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Something went wrong while sending the email. Please try again.'
      );
    });
  });
});
