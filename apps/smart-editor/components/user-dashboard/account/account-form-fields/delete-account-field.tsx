'use client';
import {
  FieldContainer,
  FieldContent,
  FieldFooter,
} from '@smart-editor/components/shared/styled-form-field';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import styled from 'styled-components';

import Image from 'next/image';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@smartcoorp/ui/dialog';
import { FormField } from '@smartcoorp/ui/form-field';
import { Headline } from '@smartcoorp/ui/headline';
import { scale270, spaceXL, spaceXS } from '@smartcoorp/ui/tokens';

import { useDeleteAccount } from '../account.hooks';

export const TrashImageContainer = styled.div`
  height: ${scale270};
  margin-bottom: ${spaceXL};

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: ${spaceXS};

  text-align: center;
`;

export const DeleteAccountField = () => {
  const session = useSession();
  const [confirmDeleteValue, setConfirmDeleteValue] = useState('');
  const [open, setOpen] = useState(false);

  const { mutate: deleteAccountMutation, isLoading } = useDeleteAccount({
    userId: session.data?.id as string,
  });

  return (
    <FieldContainer $danger>
      <FieldContent>
        <Headline size="large">Delete account</Headline>
        <Body size="small">
          Deleting your account will permanently remove all your data and cannot
          be undone.
        </Body>
      </FieldContent>
      <FieldFooter $danger>
        <Body size="small" variant="neutral" noMargin></Body>
        <Dialog
          open={open}
          onOpenChange={(open) => {
            setOpen(open);
            setConfirmDeleteValue('');
          }}
        >
          <DialogTrigger asChild>
            <Button size="small" type="submit" color="error">
              Delete account
            </Button>
          </DialogTrigger>

          <StyledDialogContent
            actionLabel="Delete"
            cancelLabel="Cancel"
            title="Delete account"
            description="Are you sure you want to delete your account?"
            variant="danger"
            onAction={() =>
              deleteAccountMutation({ userId: session.data?.id as string })
            }
            loading={isLoading}
            disabled={confirmDeleteValue !== 'permanently delete'}
          >
            <TrashImageContainer>
              <Image
                src={'/illustrations/recycle-bin.svg'}
                alt="Delete post"
                fill
              />
            </TrashImageContainer>
            <Headline size="large">Delete account</Headline>

            <Body variant="error" size="small" fontWeight="bold">
              This action cannot be undone.
            </Body>
            <Body
              size="small"
              style={{
                marginTop: spaceXL,
              }}
            >
              To confirm deletion, type <b>permanently delete</b> in the text
              input field.
            </Body>
            <FormField
              value={confirmDeleteValue}
              onChange={setConfirmDeleteValue}
              size="small"
            />
          </StyledDialogContent>
        </Dialog>
      </FieldFooter>
    </FieldContainer>
  );
};
