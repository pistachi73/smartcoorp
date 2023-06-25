import React, { FC } from 'react';
import styled from 'styled-components';

import Image from 'next/image';

import { Body } from '@smartcoorp/ui/body';
import { Breadcrumb } from '@smartcoorp/ui/breadcrumb';
import { Button } from '@smartcoorp/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@smartcoorp/ui/dialog';
import { Headline } from '@smartcoorp/ui/headline';
import {
  scale240,
  spaceL,
  spaceM,
  spaceS,
  spaceXL,
} from '@smartcoorp/ui/tokens';
type EditLayoutProps = {
  children: React.ReactNode;
  title: string;
  onDelete?: () => void;
  onSave?: () => void;
  entryId: number;
  isLoading?: boolean;
  isDirty?: boolean;
};

const EditLayoutContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;
const EditLayoutHeader = styled.div`
  width: 100%;
  padding-bottom: ${spaceXL};
  padding-top: ${spaceM};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${spaceS};
  margin-bottom: ${spaceL};
`;

const EditLayoutContentContainer = styled.div`
  width: 100%;
`;

const EditLayoutHeaderActions = styled.div`
  height: 100%;
  display: flex;
  gap: ${spaceS};
  justify-content: flex-end;
  align-items: flex-end;
`;

export const TrashImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: ${spaceXL};
`;

export const EditEntryLayout: FC<EditLayoutProps> = ({
  children,
  entryId,
  title,
  onDelete,
  onSave,
  isLoading,
  isDirty = false,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  return (
    <EditLayoutContainer>
      <Breadcrumb homeUrl="/home" />
      <EditLayoutHeader>
        <div>
          <Headline as="h1" size="xxlarge" noMargin>
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

                <Headline as="h2" size="medium" style={{ textAlign: 'center' }}>
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
            onClick={onSave}
            loading={isLoading}
            disabled={!isDirty}
          >
            Save
          </Button>
        </EditLayoutHeaderActions>
      </EditLayoutHeader>
      <EditLayoutContentContainer onSubmit={onSave}>
        {children}
      </EditLayoutContentContainer>
    </EditLayoutContainer>
  );
};
