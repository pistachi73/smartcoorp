'use client';
import {
  FieldContainer,
  FieldContent,
  FieldFooter,
} from '@smart-editor/components/shared/styled-form-field';
import { useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Headline } from '@smartcoorp/ui/headline';

import { DeletePostDialog } from '../../delete-post-dialog';

type DeletePostFieldProps = {
  coverImageUrl: string;
};

export const DeletePostField = ({ coverImageUrl }: DeletePostFieldProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();
  const { postId } = useParams();

  return (
    <FieldContainer $danger>
      <FieldContent>
        <Headline size="large">Delete post</Headline>
        <Body size="small" noMargin>
          Deleting the post will permanently remove all it&apos;s data and
          content.
        </Body>
      </FieldContent>
      <FieldFooter $danger>
        <Body size="small" variant="neutral" noMargin></Body>

        <Button
          size="small"
          color="error"
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          Delete post
        </Button>

        <DeletePostDialog
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          postId={postId}
          coverImageUrl={coverImageUrl}
          onSuccess={() => router.push('/posts')}
        />
      </FieldFooter>
    </FieldContainer>
  );
};
