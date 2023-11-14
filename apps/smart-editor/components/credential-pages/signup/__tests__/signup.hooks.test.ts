import { signUp } from '@smart-editor/actions/account.actions';
import { renderHook, waitFor } from '@smart-editor/utils/testing/test-utils';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

import { useSignUp } from '../signup.hooks';

jest.mock('@smart-editor/actions/account.actions');
jest.mock('next/navigation');
jest.mock('sonner');

const pushMock = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: pushMock,
});

const mutateInput = {
  name: 'name',
  email: 'email',
  password: 'password',
};

beforeEach(jest.clearAllMocks);

describe('<Signup /> Hooks', () => {
  describe('useSignUp', () => {
    it("should redirect to '/signup/success' on success", async () => {
      (signUp as jest.Mock).mockResolvedValueOnce({});

      const { result } = renderHook(() => useSignUp());

      result.current.mutateAsync(mutateInput);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(signUp).toHaveBeenCalledWith(mutateInput);
      expect(pushMock).toHaveBeenCalledWith('/signup/success');
    });

    it('should show error toast on error', async () => {
      (signUp as jest.Mock).mockRejectedValue(new Error('error'));

      const { result } = renderHook(() => useSignUp());

      result.current.mutate(mutateInput);

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(pushMock).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith('error');
    });
    it('should show generic error toast on error', async () => {
      (signUp as jest.Mock).mockRejectedValue('error');

      const { result } = renderHook(() => useSignUp());

      result.current.mutate(mutateInput);

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(toast.error).toHaveBeenCalledWith(
        'Something went wrong. Please try again.'
      );
    });
  });
});
