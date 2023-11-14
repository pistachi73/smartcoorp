import { updateAccount } from '@smart-editor/actions/account.actions';
import { useSingleFileUpload } from '@smart-editor/hooks/use-single-file-upload';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';
import { act } from 'react-dom/test-utils';
import { toast } from 'sonner';

import { AvatarField } from '../account-form-fields/avatar-field';
const picture =
  'https://smarteditor.app/api/assets?key=cf84fa6b-81ce-4560-bfe2-d9f863384294%2F38RvbWU09o';

const mockUserId = 'f863384294';
const mockHandleSingleFileUpload = jest.fn();
const mockUpdateSession = jest.fn();

jest.mock('sonner');
jest.mock('@smart-editor/actions/account.actions');
jest.mock('@smart-editor/hooks/use-single-file-upload', () => ({
  useSingleFileUpload: () => ({
    handleSingleFileUpload: mockHandleSingleFileUpload,
  }),
}));

jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      id: mockUserId,
    },
    update: mockUpdateSession,
  }),
}));

const getFile = (size = 1024) => {
  const file = new File([''], 'darthvader.png');
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

describe('<AvatarField />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<AvatarField picture={picture} />);
  });
  it('should render the component', () => {
    expect(screen.getByRole('heading', { name: 'Avatar' })).toBeInTheDocument();
    expect(
      screen.getByText('Upload a new avatar for your profile (Max size: 250kb)')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Account avatar' })
    ).toBeInTheDocument();
  });

  it('should throw error if file size is bigger than 250kb', () => {
    const file = getFile(1024 * 1024 + 1);

    const input = screen.getByTestId('avatar-input');
    fireEvent.change(input, { target: { files: [file] } });

    expect(toast.error).toHaveBeenCalledWith(
      'File size too large. Max size: 250kb'
    );
  });

  it("shoudn't update picture of it is the same", async () => {
    mockHandleSingleFileUpload.mockResolvedValueOnce(picture);

    const file = getFile();
    const input = screen.getByTestId('avatar-input');

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockHandleSingleFileUpload).toHaveBeenCalledWith(file);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Avatar updated');
      expect(updateAccount).not.toHaveBeenCalled();
      expect(mockUpdateSession).not.toHaveBeenCalled();
    });
  });

  it("should update picture if it's different", async () => {
    mockHandleSingleFileUpload.mockResolvedValueOnce('random-picture-url');
    const file = getFile();
    const input = screen.getByTestId('avatar-input');

    fireEvent.change(input, { target: { files: [file] } });

    expect(mockHandleSingleFileUpload).toHaveBeenCalledWith(file);
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Avatar updated');
      expect(updateAccount).toHaveBeenCalledWith({
        userId: mockUserId,
        data: {
          picture: 'random-picture-url',
        },
      });
      expect(mockUpdateSession).toHaveBeenCalledWith({
        picture: 'random-picture-url',
      });
    });
  });

  it("should show error if avatar can't be updated", async () => {
    mockHandleSingleFileUpload.mockRejectedValue({});
    const file = getFile();
    const input = screen.getByTestId('avatar-input');

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Something went wrong. Please try again.'
      );
    });
  });
});
