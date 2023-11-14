import { resetPassword } from '@smart-editor/actions/account.actions';
import { renderHook, waitFor } from '@smart-editor/utils/testing/test-utils';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

import { useResetPassword } from '../reset-password.hooks';

jest.mock('@smart-editor/actions/account.actions');
jest.mock('next/navigation');
jest.mock('sonner');

const pushMock = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: pushMock,
});

const mutateInput = {
  confirmPassword: 'password',
  password: 'password',
  token: 'token',
};

beforeEach(jest.clearAllMocks);

describe('<ResetPassword /> Hooks', () => {
  describe('useResetPassword', () => {
    it("should redirect to '/forgot-password/success' on success", async () => {
      (resetPassword as jest.Mock).mockResolvedValueOnce({});

      const { result } = renderHook(() => useResetPassword());

      result.current.mutate(mutateInput);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(resetPassword).toHaveBeenCalledWith(mutateInput);
      expect(toast.success).toHaveBeenCalledWith(
        'Password reset successfully!'
      );
      expect(pushMock).toHaveBeenCalledWith('/login');
    });

    it('should show error toast on error', async () => {
      (resetPassword as jest.Mock).mockRejectedValue(new Error('error'));

      const { result } = renderHook(() => useResetPassword());

      result.current.mutate(mutateInput);

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(pushMock).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('error');
    });
    it('should show generic error toast on error', async () => {
      (resetPassword as jest.Mock).mockRejectedValue('error');

      const { result } = renderHook(() => useResetPassword());

      result.current.mutate(mutateInput);

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(toast.error).toHaveBeenCalledWith(
        'Something went wrong. Please try again.'
      );
    });
  });
});
