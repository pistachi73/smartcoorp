import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';

import { NameField } from '../account-form-fields/name-field';
import { useUpdateField } from '../account.hooks';

const mockUserId = 'f863384294';
const name = 'name';
const newName = 'new name';
const mockMutate = jest.fn();
const mockUpdateSession = jest.fn();

jest.mock('../account.hooks');
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      id: mockUserId,
      user: {
        name,
      },
    },
    update: mockUpdateSession,
  }),
}));

(useUpdateField as jest.Mock).mockReturnValue({
  mutate: mockMutate,
});

describe('<NameField />', () => {
  beforeEach(() => {
    render(<NameField name={name} isGoogleUser={false} />);
  });
  it('should render the component ', () => {
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Please enter your full name, or a display name you are comfortable with.'
      )
    ).toBeInTheDocument();

    expect(screen.getByRole('textbox')).toHaveValue(name);

    expect(useUpdateField).toHaveBeenCalledWith({ field: 'name' });
  });
  it('should render the component if is google user', () => {
    render(<NameField name={name} isGoogleUser={true} />);

    expect(
      screen.getByText(
        'You are using Google to log in. You cannot change your name address.'
      )
    ).toBeInTheDocument();
  });

  it('should update name', async () => {
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: newName } });
    const button = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        userId: mockUserId,
        data: {
          name: newName,
        },
      });
    });

    expect(mockUpdateSession).toHaveBeenCalledWith({
      name: newName,
    });
  });
});
