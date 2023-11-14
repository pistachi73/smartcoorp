import {
  createApiKey,
  deleteApiKey,
  getApiKeys,
} from '@smart-editor/actions/api-keys.actions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useGetApiKeys = ({ userId }: { userId: string }) =>
  useQuery({
    queryKey: ['getApiKeys'],
    queryFn: () => getApiKeys({ userId }),
    refetchOnWindowFocus: false,
  });

export const useCreateApiKey = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createApiKey'],
    mutationFn: createApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getApiKeys'] });
      toast.success('Api key created successfully');
      onSuccess();
    },
    onError: () => {
      toast.error('Error creating API key');
    },
  });
};

export const useDeleteApiKey = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteApiKey'],
    mutationFn: deleteApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getApiKeys'] });
      toast.success('Api keys deleted successfully');
      onSuccess();
    },
    onError: () => {
      toast.error("Couldn't delete api keys");
    },
  });
};
