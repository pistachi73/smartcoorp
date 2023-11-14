import { deleteFile } from '@smart-editor/actions/delete-file';
import { createPost, deletePost } from '@smart-editor/actions/posts.actions';
import { renderHook, waitFor } from '@smart-editor/utils/testing/test-utils';
import { toast } from 'sonner';

import { useCreatePost, useDeletePost } from '../posts.hooks';

const mockUserId = 'mockUserId';
const mockKey = 'mockKey';
const mockCoverImageUrl = `https://smarteditor.app/api/assets?key=${mockKey}`;
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

    it('should call deleteFile if coverImageUrl is provided', async () => {
      const { result } = renderHook(() =>
        useDeletePost({ onSuccess: mockOnSuccess })
      );

      await result.current.mutate({
        postId: 'postId',
        coverImageUrl: mockCoverImageUrl,
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(deleteFile).toHaveBeenCalledWith({
        key: mockKey,
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
});
