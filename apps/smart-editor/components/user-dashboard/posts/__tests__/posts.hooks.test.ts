import { deleteFile, deleteFolder } from '@smart-editor/actions/delete-file';
import {
  createPost,
  deletePost,
  updatePost,
} from '@smart-editor/actions/posts.actions';
import { renderHook, waitFor } from '@smart-editor/utils/testing/test-utils';
import { toast } from 'sonner';

import {
  Field,
  successMessageMap,
  useCreatePost,
  useDeletePost,
  useUpdatePost,
} from '../posts.hooks';

const mockUserId = 'mockUserId';
const mockOnSuccess = jest.fn();
const mockPush = jest.fn();
jest.mock('@smart-editor/actions/delete-file');
jest.mock('@smart-editor/actions/posts.actions');
jest.mock('sonner');
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      id: mockUserId,
    },
  }),
}));
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

beforeEach(jest.resetAllMocks);

describe('<Posts /> Hooks', () => {
  describe('useDeletePost', () => {
    it('should call deletePost', async () => {
      (deletePost as jest.Mock).mockResolvedValueOnce({});
      const { result } = renderHook(() =>
        useDeletePost({ onSuccess: mockOnSuccess })
      );

      await result.current.mutate({
        postId: 'postId',
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(deletePost).toHaveBeenCalledWith({ postId: 'postId' });
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Post deleted!');
      expect(deleteFile).not.toHaveBeenCalled();
    });

    it('should call deleteFolder if userId is provided', async () => {
      const { result } = renderHook(() =>
        useDeletePost({ onSuccess: mockOnSuccess })
      );

      await result.current.mutate({
        postId: 'postId',
        userId: mockUserId,
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(deleteFolder).toHaveBeenCalledWith({
        folder: `${mockUserId}/postId`,
      });
    });

    it('should call toast.error if deletePost throws an error', async () => {
      (deletePost as jest.Mock).mockRejectedValueOnce({});

      const { result } = renderHook(() =>
        useDeletePost({ onSuccess: mockOnSuccess })
      );

      await result.current.mutate({
        postId: 'postId',
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(toast.error).toHaveBeenCalledWith("Couldn't delete post.");
    });
  });

  describe('useCreatePost', () => {
    it("should call toast.success and router.push('/posts/:postId') on success", async () => {
      const postId = 'postId';
      (createPost as jest.Mock).mockResolvedValueOnce({ postId });
      const { result } = renderHook(() => useCreatePost());

      await result.current.mutate();

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(toast.success).toHaveBeenCalledWith(
        'Post created successfully! Start writing now.'
      );
      expect(mockPush).toHaveBeenCalledWith(`/posts/${postId}`);
    });

    it('should call toast.error on error', async () => {
      (createPost as jest.Mock).mockRejectedValueOnce({});
      const { result } = renderHook(() => useCreatePost());

      await result.current.mutate();

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(toast.error).toHaveBeenCalledWith(
        "Couldn't create post. Please try again."
      );
    });
  });

  describe('useUpdatePost', () => {
    it.each<{
      field: Field;
      toastMessage: string;
    }>([
      {
        field: 'prose',
        toastMessage: successMessageMap.prose,
      },
      {
        field: 'coverImage',
        toastMessage: successMessageMap.coverImage,
      },
      {
        field: 'status',
        toastMessage: successMessageMap.status,
      },
    ])(
      'should  call toast.success for $field field on success',
      async ({ field, toastMessage }) => {
        const postId = 'postId';
        (updatePost as jest.Mock).mockResolvedValueOnce({});
        const { result } = renderHook(() =>
          useUpdatePost({
            field,
          })
        );

        await result.current.mutate({
          data: {},
          postId,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        if (toastMessage) {
          expect(toast.success).toHaveBeenCalledWith(toastMessage);
        } else {
          expect(toast.success).not.toHaveBeenCalled();
        }
      }
    );

    it.each<{
      field: Field;
    }>([
      {
        field: 'content',
      },
    ])(
      'should not call toast.success for $field field on success',
      async ({ field }) => {
        const postId = 'postId';
        (updatePost as jest.Mock).mockResolvedValueOnce({});
        const { result } = renderHook(() =>
          useUpdatePost({
            field,
          })
        );

        await result.current.mutate({
          data: {},
          postId,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(toast.success).not.toHaveBeenCalled();
      }
    );

    it('should call toast.error on error', async () => {
      (updatePost as jest.Mock).mockRejectedValueOnce({});
      const { result } = renderHook(() =>
        useUpdatePost({
          field: 'status',
        })
      );

      await result.current.mutate({
        data: {},
        postId: 'postId',
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(toast.error).toHaveBeenCalledWith(
        'Something went wrong. Please try again.'
      );
    });
  });
});
