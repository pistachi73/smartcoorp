'use client';

import type { EApiKey } from '@prisma/client';

import Image from 'next/image';

import { Body } from '@smartcoorp/ui/body';
import { Dialog, DialogContent } from '@smartcoorp/ui/dialog';
import { Headline } from '@smartcoorp/ui/headline';

import { useDeleteApiKey } from '../api-keys.hooks';

import {
  ApiKeyBadge,
  ApiKeyBadgeContainer,
  TextContainer,
  TrashImageContainer,
} from './delete-api-key-dialog.styles';

type DeleteApiKeyDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toDeleteApiKeys: EApiKey[];
};

export const DeleteApiKeyDialog = ({
  isOpen = false,
  setIsOpen,
  toDeleteApiKeys,
}: DeleteApiKeyDialogProps) => {
  const { mutate: deleteApiKey, isLoading } = useDeleteApiKey({
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  const onDelete = async (apiKeyIds: string[]) => {
    await deleteApiKey({
      apiKeyIds,
    });
  };

  return (
    <Dialog defaultOpen={false} open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        title="Are you sure you want to delete this api key?"
        description="This action cannot be undone."
        onAction={(e) => onDelete(toDeleteApiKeys.map(({ id }) => id))}
        onCancel={() => setIsOpen(false)}
        actionLabel={`Yes, delete`}
        cancelLabel="Cancel"
        loading={isLoading}
        variant="danger"
      >
        <TrashImageContainer>
          <Image
            src={'/illustrations/recycle-bin.svg'}
            alt="Delete post"
            fill
          />
        </TrashImageContainer>

        <TextContainer>
          <Headline as="h2" size="large" noMargin>
            Delete API Keys
          </Headline>
          <Body size="small" noMargin>
            Are you sure you want to delete this api keys?
          </Body>
          <Body variant="error" size="small" fontWeight="bold">
            This action cannot be undone.
          </Body>
        </TextContainer>
        <ApiKeyBadgeContainer>
          {toDeleteApiKeys.map(({ id, name }) => (
            <ApiKeyBadge
              forwardedAs={'span'}
              size="small"
              noMargin
              key={`${id}-${name}`}
            >
              {name}
            </ApiKeyBadge>
          ))}
        </ApiKeyBadgeContainer>
      </DialogContent>
    </Dialog>
  );
};
