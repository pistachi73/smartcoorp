'use client';

import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction } from 'react';

import { Body } from '@smartcoorp/ui/body';
import { Dialog, DialogContent } from '@smartcoorp/ui/dialog';
import { Headline } from '@smartcoorp/ui/headline';

import { useDeletePost } from '../posts.hooks';

import {
  DeleteDialogTextContainer,
  TrashImageContainer,
} from './delete-post-dialog.styles';

type DeletePostDialogProps = {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  postId: string;
  onSuccess?: any;
};

export const DeletePostDialog = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  postId,
  onSuccess,
}: DeletePostDialogProps) => {
  const session = useSession();
  const { mutateAsync: deletePost, isLoading } = useDeletePost({ onSuccess });
  const onDelete = async () => {
    await deletePost({ postId, userId: session?.data?.id });
  };

  return (
    <Dialog
      defaultOpen={false}
      open={isDeleteDialogOpen}
      onOpenChange={setIsDeleteDialogOpen}
    >
      <DialogContent
        title="Delete Post"
        description="Are you sure you want to delete this post?"
        onAction={onDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
        actionLabel={`Yes, delete`}
        cancelLabel="Cancel"
        loading={isLoading}
        variant="danger"
      >
        <TrashImageContainer>
          <img src={'/illustrations/recycle-bin.svg'} alt="Delete post" />
        </TrashImageContainer>

        <DeleteDialogTextContainer>
          <Headline as="h2" size="large" noMargin>
            Delete Post
          </Headline>
          <Body size="small" noMargin>
            Are you sure you want to delete this post?
          </Body>
          <Body variant="error" size="small" fontWeight="bold">
            This action cannot be undone.
          </Body>
        </DeleteDialogTextContainer>
      </DialogContent>
    </Dialog>
  );
};
