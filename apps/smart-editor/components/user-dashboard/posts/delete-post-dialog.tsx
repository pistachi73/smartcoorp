'use client';

import { deleteFile } from '@smart-editor/actions/delete-file';
import { deletePost } from '@smart-editor/actions/posts.actions';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

import { Body } from '@smartcoorp/ui/body';
import { Dialog, DialogContent } from '@smartcoorp/ui/dialog';
import { Headline } from '@smartcoorp/ui/headline';

import { DeleteDialogTextContainer, TrashImageContainer } from './posts.styles';

type DeletePostDialogProps = {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: Dispatch<SetStateAction<boolean>>;
  postId: string;
  coverImageUrl?: string | null;
  onSuccess?: any;
};

export const DeletePostDialog = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  postId,
  coverImageUrl,
  onSuccess,
}: DeletePostDialogProps) => {
  const [isDeleteDialogLoading, setIsDeleteDialogLoading] = useState(false);

  const onDelete = async () => {
    setIsDeleteDialogLoading(true);

    try {
      await deletePost({ postId });
      if (coverImageUrl) {
        const key = new URL(coverImageUrl).searchParams.get('key');

        await deleteFile({
          key,
        });
      }

      toast.success('Post deleted!');
      onSuccess?.();
    } catch (error) {
      toast.error("Couldn't delete post.");
    }

    setIsDeleteDialogLoading(false);
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
        loading={isDeleteDialogLoading}
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
