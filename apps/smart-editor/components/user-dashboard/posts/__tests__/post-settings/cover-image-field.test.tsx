import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';

import { useParams } from 'next/navigation';

import { CoverImageField } from '../../post-settings/fields/cover-image-field';
import { useUpdatePost } from '../../posts.hooks';

const mockUserId = 'mockUserId';
const mockPostId = 'mockPostId';
const mockCoverImageUrl = 'mockCoverImageUrl';
const mockHandleSingleFileUpload = jest.fn();
const mockMutate = jest.fn();

jest.mock('../../posts.hooks');
jest.mock('next/navigation');
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
  }),
}));
global.URL.createObjectURL = jest.fn();

(useParams as jest.Mock).mockReturnValue({
  postId: mockPostId,
});

(useUpdatePost as jest.Mock).mockReturnValue({
  mutateAsync: mockMutate,
});

const getFile = (size = 1024) => {
  const file = new File([''], 'darthvader.png');
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

describe('<CoverImageField />', () => {
  it('should render the component', () => {
    render(<CoverImageField coverImageUrl={mockCoverImageUrl} />);
    expect(
      screen.getByRole('heading', { name: 'Cover Image' })
    ).toBeInTheDocument();
  });

  it('should throw error if file size is bigger than 500kb', async () => {
    render(<CoverImageField coverImageUrl={mockCoverImageUrl} />);

    const file = getFile(500001);

    const input = screen.getByTestId('upload-file-input');
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('darthvader.png')).toBeInTheDocument();
      expect(
        screen.getByText('File is larger than 500000 bytes')
      ).toBeInTheDocument();
    });
  });

  it('should upload new cover image', async () => {
    mockHandleSingleFileUpload.mockResolvedValueOnce(mockCoverImageUrl);

    render(<CoverImageField coverImageUrl={mockCoverImageUrl} />);

    const file = getFile();
    const input = screen.getByTestId('upload-file-input');

    fireEvent.change(input, { target: { files: [file] } });
    await waitFor(() => {
      expect(screen.getByText('darthvader.png')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));

    await waitFor(() => {
      expect(mockHandleSingleFileUpload).toHaveBeenCalledWith(file);
      expect(mockMutate).toHaveBeenCalledWith({
        postId: mockPostId,
        data: {
          coverImageUrl: mockCoverImageUrl,
        },
      });
    });
  });
});
