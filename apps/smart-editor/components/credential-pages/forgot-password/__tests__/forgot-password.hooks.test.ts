import { sendForgotPasswordEmail } from '@smart-editor/actions/account.actions';
import { renderHook, waitFor } from '@smart-editor/utils/testing/test-utils';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

import { useSendForgotPasswordEmail } from '../forgot-password.hooks';

jest.mock('@smart-editor/actions/account.actions');
jest.mock('next/navigation');
jest.mock('sonner');

const pushMock = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: pushMock,
});

beforeEach(jest.clearAllMocks);

describe('<ForgotPassword /> Hooks', () => {
  describe('useSendForgotPasswordEmail', () => {
    it("should redirect to '/forgot-password/success' on success", async () => {
      (sendForgotPasswordEmail as jest.Mock).mockResolvedValueOnce({});

      const { result } = renderHook(() => useSendForgotPasswordEmail());

      result.current.mutateAsync({ email: 'email' });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(sendForgotPasswordEmail).toHaveBeenCalledWith({ email: 'email' });
      expect(pushMock).toHaveBeenCalledWith('/forgot-password/success');
    });

    it('should show error toast on error', async () => {
      (sendForgotPasswordEmail as jest.Mock).mockRejectedValue(
        new Error('error')
      );

      const { result } = renderHook(() => useSendForgotPasswordEmail());

      result.current.mutate({ email: 'email' });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(pushMock).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('error');
    });
    it('should show generic error toast on error', async () => {
      (sendForgotPasswordEmail as jest.Mock).mockRejectedValue('error');

      const { result } = renderHook(() => useSendForgotPasswordEmail());

      result.current.mutate({ email: 'email' });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(toast.error).toHaveBeenCalledWith(
        'Something went wrong. Please try again.'
      );
    });
  });
});
