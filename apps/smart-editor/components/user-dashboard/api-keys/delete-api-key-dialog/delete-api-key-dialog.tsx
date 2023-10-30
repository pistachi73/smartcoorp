'use client';

import type { EApiKey } from '@prisma/client';
import { deleteApiKey } from '@smart-editor/actions/api-keys.actions';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import Image from 'next/image';

import { Body } from '@smartcoorp/ui/body';
import { Dialog, DialogContent } from '@smartcoorp/ui/dialog';
import { Headline } from '@smartcoorp/ui/headline';

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
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const onDelete = async (apiKeyIds: string[]) => {
    setLoading(true);

    try {
      await deleteApiKey({
        apiKeyIds,
      });

      queryClient.invalidateQueries({ queryKey: ['getApiKeys'] });
      setIsOpen(false);
      toast.success('Api keys deleted successfully');
    } catch (error) {
      toast.error("Couldn't delete api keys");
    }

    setLoading(false);
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
