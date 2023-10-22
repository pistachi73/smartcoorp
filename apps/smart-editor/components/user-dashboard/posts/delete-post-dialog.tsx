'use client';

import { useState } from 'react';

import { Body } from '@smartcoorp/ui/body';
import { Dialog, DialogContent, DialogTrigger } from '@smartcoorp/ui/dialog';
import { Headline } from '@smartcoorp/ui/headline';

import { DeleteDialogTextContainer, TrashImageContainer } from './posts.styles';

type DeletePostDialogProps = {
  trigger: React.ReactNode;
  postId: number;
  onDelete: (postId: string) => void;
};

export const DeletePostDialog = ({
  postId,
  trigger,
  onDelete,
}: DeletePostDialogProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <Dialog
      defaultOpen={false}
      open={isDeleteDialogOpen}
      onOpenChange={setIsDeleteDialogOpen}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        title="Are you sure you want to delete this post?"
        description="This action cannot be undone."
        // onAction={onDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
        actionLabel={`Yes, delete`}
        cancelLabel="Cancel"
        // loading={isLoading}
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
