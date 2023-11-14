import { resetPassword } from '@smart-editor/actions/account.actions';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useRouter } from 'next/navigation';

export const useResetPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Password reset successfully!');
      router.push('/login');
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
