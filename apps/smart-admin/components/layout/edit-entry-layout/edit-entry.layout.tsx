'use client';

import { FetchStatus } from '@tanstack/react-query';
import React, { FC, useEffect } from 'react';

import Image from 'next/image';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@smartcoorp/ui/dialog';
import { DotLoading } from '@smartcoorp/ui/dot-loading';
import { Headline } from '@smartcoorp/ui/headline';
import { scale240 } from '@smartcoorp/ui/tokens';

import {
  EditLayoutContainer,
  EditLayoutContentContainer,
  EditLayoutHeader,
  EditLayoutHeaderActions,
  LoadingContainer,
  TrashImageContainer,
} from './edit-entry-layout.styles';

type EditLayoutProps = {
  children: React.ReactNode;
  title: string;
  onDelete?: () => void;
  onSave?: () => void;
  entryId: number;
  status: 'error' | 'success' | 'loading';
  fetchStatus: FetchStatus;
  isLoading?: boolean;
  isDirty?: boolean;
};

export const EditEntryLayout: FC<EditLayoutProps> = ({
  children,
  entryId,
  title,
  onDelete,
  onSave,
  isLoading,
  status,
  fetchStatus,
  isDirty = false,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  useEffect(() => {
    console.log({ isDeleteDialogOpen });
  }, [isDeleteDialogOpen]);
  return (
    <>
      <EditLayoutContainer>
        <EditLayoutHeader>
          <div>
            <Headline as="h1" size="xlarge" noMargin>
              {title} Edit Entry Panel
            </Headline>
            <Body variant="neutral" size="small" noMargin>
              {entryId !== -1
                ? `Update or delete ${title} entry with id ${entryId}`
                : `Create new ${title} entry`}
            </Body>
          </div>
          <EditLayoutHeaderActions>
            {entryId !== -1 ? (
              <Dialog
                defaultOpen={false}
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="secondary" size="small" disabled={isLoading}>
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent
                  title="Are you sure you want to delete this entry?"
                  description="This action cannot be undone."
                  onAction={onDelete}
                  onCancel={() => setIsDeleteDialogOpen(false)}
                  actionLabel={`Yes, delete`}
                  cancelLabel="Cancel"
                  loading={isLoading}
                  variant="danger"
                >
                  <TrashImageContainer>
                    <Image
                      src={'/bin-illustration.png'}
                      alt="delete entry"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: 'auto', height: scale240 }} // optional
                    />
                  </TrashImageContainer>

                  <Headline
                    as="h2"
                    size="medium"
                    style={{ textAlign: 'center' }}
                  >
                    Are you sure you want to delete this entry?
                  </Headline>
                  <Body
                    variant="neutral"
                    size="small"
                    style={{ textAlign: 'center' }}
                  >
                    This action cannot be undone.
                  </Body>
                </DialogContent>
              </Dialog>
            ) : null}

            <Button
              variant="primary"
              size="small"
              loading={isLoading}
              disabled={!isDirty}
              type="submit"
              form="edit-entry-form"
            >
              Save
            </Button>
          </EditLayoutHeaderActions>
        </EditLayoutHeader>
        <EditLayoutContentContainer id="edit-entry-form" onSubmit={onSave}>
          {status === 'error' ? (
            <LoadingContainer>
              <Headline>Error</Headline>
            </LoadingContainer>
          ) : status === 'loading' && fetchStatus !== 'idle' ? (
            <LoadingContainer>
              <DotLoading disabled={true} />
            </LoadingContainer>
          ) : (
            children
          )}
        </EditLayoutContentContainer>
      </EditLayoutContainer>
    </>
  );
};
