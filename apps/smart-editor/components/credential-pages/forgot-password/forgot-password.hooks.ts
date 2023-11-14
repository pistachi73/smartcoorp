import { sendForgotPasswordEmail } from '@smart-editor/actions/account.actions';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

export const useSendForgotPasswordEmail = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ['sendForgotPasswordEmail'],
    mutationFn: sendForgotPasswordEmail,

    onSuccess: () => {
      router.push('/forgot-password/success');
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
