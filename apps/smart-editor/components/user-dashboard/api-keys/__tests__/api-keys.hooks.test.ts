import {
  createApiKey,
  deleteApiKey,
  getApiKeys,
} from '@smart-editor/actions/api-keys.actions';
import { renderHook, waitFor } from '@smart-editor/utils/testing/test-utils';
import { toast } from 'sonner';

import { mockApiKeys } from '../__mocks__';
import {
  useCreateApiKey,
  useDeleteApiKey,
  useGetApiKeys,
} from '../api-keys.hooks';

const mockUserId = 'f863384294';

jest.mock('@smart-editor/actions/api-keys.actions');
jest.mock('sonner');

describe('<ApiKeys /> Hooks', () => {
  describe('useGetApiKeys', () => {
    it('should return api keys', async () => {
      (getApiKeys as jest.Mock).mockResolvedValue({ apiKeys: mockApiKeys });
      const { result } = renderHook(() =>
        useGetApiKeys({ userId: mockUserId })
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data?.apiKeys).toEqual(mockApiKeys);
    });
  });
  describe('useDeleteApiKey', () => {
    const mockOnSuccess = jest.fn();
    const renderUseDeleteApiKey = () =>
      renderHook(() => useDeleteApiKey({ onSuccess: mockOnSuccess }));

    it('should call onSuccess callback on success', async () => {
      (deleteApiKey as jest.Mock).mockResolvedValue({});

      const { result, rerender } = renderUseDeleteApiKey();

      result.current.mutate({ apiKeyIds: ['mockId'] });

      rerender();

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(
        'Api keys deleted successfully'
      );
    });

    it('should call onError callback on error', async () => {
      (deleteApiKey as jest.Mock).mockRejectedValue({});

      const { result, rerender } = renderUseDeleteApiKey();

      result.current.mutate({ apiKeyIds: ['mockId'] });

      rerender();

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(toast.error).toHaveBeenCalledWith("Couldn't delete api keys");
    });
  });
  describe('useCreateApiKey', () => {
    const mockOnSuccess = jest.fn();
    const renderUseCreateApiKey = () =>
      renderHook(() => useCreateApiKey({ onSuccess: mockOnSuccess }));

    it('should call onSuccess callback on success', async () => {
      (createApiKey as jest.Mock).mockResolvedValue({});
      const { result, rerender } = renderUseCreateApiKey();

      result.current.mutate({
        apiKeyName: 'mockName',
        apiKeyToken: 'mockToken',
        userId: mockUserId,
      });

      rerender();

      await waitFor(() => expect(result.current.isSuccess).toBe(true));
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(
        'Api key created successfully'
      );
    });

    it('should call onError callback on error', async () => {
      (createApiKey as jest.Mock).mockRejectedValue({});
      const { result, rerender } = renderUseCreateApiKey();

      result.current.mutate({
        apiKeyName: 'mockName',
        apiKeyToken: 'mockToken',
        userId: mockUserId,
      });

      rerender();

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(toast.error).toHaveBeenCalledWith('Error creating API key');
    });
  });
});
