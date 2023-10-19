'use client';

import { useState } from 'react';

import { Body } from '@smartcoorp/ui/body';
import { Dialog, DialogContent, DialogTrigger } from '@smartcoorp/ui/dialog';
import { Headline } from '@smartcoorp/ui/headline';

import { TrashImageContainer } from './posts.styles';

type DeletePostDialogProps = {
  trigger: React.ReactNode;
  postId: number;
};

export const DeletePostDialog = ({
  postId,
  trigger,
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

        <Headline as="h2" size="medium" style={{ textAlign: 'center' }}>
          Are you sure you want to delete this post?
        </Headline>
        <Body variant="neutral" size="small" style={{ textAlign: 'center' }}>
          This action cannot be undone.
        </Body>
      </DialogContent>
    </Dialog>
  );
};
