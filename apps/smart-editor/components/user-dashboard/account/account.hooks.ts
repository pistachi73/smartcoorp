import {
  deleteAccount,
  updateAccount,
} from '@smart-editor/actions/account.actions';
import { deleteFolder } from '@smart-editor/actions/delete-file';
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';

type Field = 'email' | 'name' | 'password';

export const successMessageMap: Record<Field, string> = {
  email: 'Email updated. Please check your email to verify the change',
  name: 'Name updated',
  password: 'Password updated',
};

export const useUpdateField = ({ field }: { field: Field }) =>
  useMutation({
    mutationFn: updateAccount,

    onSuccess: () => {
      toast.success(successMessageMap[field]);
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

export const useDeleteAccount = ({ userId }: { userId: string }) =>
  useMutation({
    mutationFn: deleteAccount,
    onSuccess: async () => {
      await deleteFolder({
        folder: userId,
      });

      toast.success('Account deleted!');
      signOut({ callbackUrl: '/' });
    },
    onError: (e) => {
      toast.error('Something went wrong. Please try again.');
    },
  });
