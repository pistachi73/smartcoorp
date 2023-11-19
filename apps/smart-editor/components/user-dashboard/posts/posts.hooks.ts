import { deleteFolder } from '@smart-editor/actions/delete-file';
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '@smart-editor/actions/posts.actions';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

export const useGetPost = () => {
  const session = useSession({ required: true });
  const { postId } = useParams();

  return useQuery({
    queryKey: ['getPost', postId],
    queryFn: () => getPost({ postId, userId: session?.data?.id as string }),
    refetchOnWindowFocus: false,
    enabled: session.status === 'authenticated',
  });
};

export const useGetPosts = () => {
  const session = useSession({ required: true });
  const searchParams = useSearchParams();

  return useQuery({
    queryKey: ['getPosts', searchParams.get('title') ?? ''],
    queryFn: () =>
      getPosts({
        userId: session?.data?.id as string,
        title: searchParams.get('title') ?? '',
      }),
    refetchOnWindowFocus: false,
    enabled: session.status === 'authenticated',
  });
};

export type Field = 'prose' | 'status' | 'coverImage' | 'content';

export const successMessageMap: Record<Exclude<Field, 'content'>, string> = {
  prose: 'Title and description updated',
  status: 'Status updated',
  coverImage: 'Cover image updated',
};

export const useUpdatePost = ({ field }: { field: Field }) =>
  useMutation({
    mutationKey: ['updatePost'],
    mutationFn: updatePost,

    onSuccess: () => {
      if (field !== 'content') {
        toast.success(successMessageMap[field]);
      }
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

export const useCreatePost = () => {
  const router = useRouter();
  const session = useSession();

  return useMutation({
    mutationKey: ['createPost'],
    mutationFn: async () => {
      return await createPost({ userId: session?.data?.id as string });
    },
    onSuccess: ({ postId }) => {
      router.push(`/posts/${postId}`);
      toast.success('Post created successfully! Start writing now.');
    },
    onError: () => {
      toast.error("Couldn't create post. Please try again.");
    },
  });
};

type DeletePostMutation = {
  postId: string;
  userId?: string;
};
export const useDeletePost = ({ onSuccess }: { onSuccess?: () => void }) =>
  useMutation({
    mutationKey: ['deletePost'],
    mutationFn: async ({ postId, userId }: DeletePostMutation) => {
      await deletePost({ postId });

      if (!userId) return;
      await deleteFolder({
        folder: `${userId}/${postId}`,
      });
    },

    onSuccess: () => {
      toast.success('Post deleted!');
      onSuccess?.();
    },
    onError: () => {
      toast.error("Couldn't delete post.");
    },
  });
