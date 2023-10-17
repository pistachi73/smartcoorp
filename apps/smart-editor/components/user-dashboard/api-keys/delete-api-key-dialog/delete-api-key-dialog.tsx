'use client';

import type { EApiKey } from '@prisma/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import { revalidatePath } from 'next/cache';
import Image from 'next/image';

import { Body } from '@smartcoorp/ui/body';
import { Dialog, DialogContent } from '@smartcoorp/ui/dialog';
import { Headline } from '@smartcoorp/ui/headline';

import { deleteApiKey } from './action';
import {
  ApiKeyBadge,
  ApiKeyBadgeContainer,
  TextContainer,
  TrashImageContainer,
} from './delete-api-key-dialog.styles';

type DeleteApiKeyDialogProps = {
  userId: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toDeleteApiKeys: EApiKey[];
  setApiKeysState: Dispatch<SetStateAction<EApiKey[]>>;
};

const DeleteApiKeySchema = z.object({
  name: z.string().nonempty(),
});

export type DeleteApiKeyData = z.infer<typeof DeleteApiKeySchema>;

export const DeleteApiKeyDialog = ({
  userId,
  isOpen = false,
  setIsOpen,
  toDeleteApiKeys,
  setApiKeysState,
}: DeleteApiKeyDialogProps) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async (apiKeyIds: number[]) => {
    setLoading(true);
    await deleteApiKey({
      apiKeyIds,
    });
    setApiKeysState((apiKeys) =>
      apiKeys.filter(({ id }) => !apiKeyIds.includes(id))
    );
    setLoading(false);
    setIsOpen(false);
    toast.success('Api keys deleted successfully');
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
        loading={loading}
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
