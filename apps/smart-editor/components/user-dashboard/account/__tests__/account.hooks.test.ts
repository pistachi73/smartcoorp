import {
  deleteAccount,
  updateAccount,
} from '@smart-editor/actions/account.actions';
import { deleteFolder } from '@smart-editor/actions/delete-file';
import { renderHook, waitFor } from '@smart-editor/utils/testing/test-utils';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

import {
  successMessageMap,
  useDeleteAccount,
  useUpdateField,
} from '../account.hooks';

jest.mock('@smart-editor/actions/account.actions');
jest.mock('@smart-editor/actions/delete-file');
jest.mock('next-auth/react');
jest.mock('sonner');

describe('<Account /> Hooks', () => {
  describe('useUpdateField', () => {
    it.each([
      {
        field: 'email',
        successMessage: successMessageMap['email'],
      },
      {
        field: 'name',
        successMessage: successMessageMap['name'],
      },
      {
        field: 'password',
        successMessage: successMessageMap['password'],
      },
    ])(
      'should call updateAccount and toast.success with $field message on success',
      async ({ field, successMessage }) => {
        (updateAccount as jest.Mock).mockResolvedValue({});

        const { result, rerender } = renderHook(() =>
          useUpdateField({ field: field as any })
        );
        result.current.mutate({
          userId: 'mockId',
          data: { email: 'mockEmail' },
        });

        rerender();
        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(updateAccount).toHaveBeenCalledWith({
          userId: 'mockId',
          data: { email: 'mockEmail' },
        });

        expect(toast.success).toHaveBeenCalledWith(successMessage);
      }
    );

    it('should call toast.error on error', async () => {
      (updateAccount as jest.Mock).mockRejectedValue({});
      const { result } = renderHook(() => useUpdateField({ field: 'email' }));

      result.current.mutate({ userId: 'mockId', data: {} });

      await waitFor(() => {
        expect(result.current.isError).toBe(false);
      });

      expect(toast.error).toHaveBeenCalledWith(
        'Something went wrong. Please try again.'
      );
    });
  });

  describe('useDeleteAccount', () => {
    beforeEach(jest.clearAllMocks);

    const mockUserId = 'mockId';

    it('should call deleteAccount and toast.success on success', async () => {
      (deleteAccount as jest.Mock).mockResolvedValue({});
      const { result } = renderHook(() =>
        useDeleteAccount({ userId: mockUserId })
      );
      result.current.mutate({ userId: mockUserId });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(deleteFolder).toHaveBeenCalledTimes(1);
      expect(deleteFolder).toHaveBeenCalledWith({ folder: mockUserId });
      expect(toast.success).toHaveBeenCalledWith('Account deleted!');
      expect(signOut).toHaveBeenCalledWith({ callbackUrl: '/' });
    });

    it('should call toast.error on error', async () => {
      (deleteAccount as jest.Mock).mockRejectedValue({});

      const { result } = renderHook(() =>
        useDeleteAccount({ userId: mockUserId })
      );

      result.current.mutate({ userId: mockUserId });

      await waitFor(() => expect(result.current.isError).toBe(false));
      expect(deleteFolder).not.toHaveBeenCalled();
      expect(signOut).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(
        'Something went wrong. Please try again.'
      );
    });
  });
});
