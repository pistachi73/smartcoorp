import { signUp } from '@smart-editor/actions/account.actions';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

export const useSignUp = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: signUp,
    onSuccess: () => {
      router.push('/signup/success');
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    },
  });
};
