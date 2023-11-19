import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';

import { DeletePostDialog } from '../delete-post-dialog';
import { useDeletePost } from '../posts.hooks';

const mockUserId = 'mockUserId';
const mockMutate = jest.fn();

jest.mock('../posts.hooks');
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      id: mockUserId,
    },
  }),
}));

(useDeletePost as jest.Mock).mockReturnValue({
  mutateAsync: mockMutate,
});

describe('<DeletePostDialog />', () => {
  it('should render expected content', () => {
    render(
      <DeletePostDialog
        isDeleteDialogOpen={true}
        setIsDeleteDialogOpen={jest.fn()}
        postId="1"
      />
    );

    expect(
      screen.getAllByText('Are you sure you want to delete this post?')
    ).toHaveLength(2);
    expect(
      screen.getByText('This action cannot be undone.')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Yes, delete' })
    ).toBeInTheDocument();
  });

  it("should call 'deletePost' on click on 'Yes, delete'", async () => {
    render(
      <DeletePostDialog
        isDeleteDialogOpen={true}
        setIsDeleteDialogOpen={jest.fn()}
        postId="1"
      />
    );

    const button = screen.getByRole('button', { name: 'Yes, delete' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        postId: '1',
        userId: mockUserId,
      });
    });
  });
});
