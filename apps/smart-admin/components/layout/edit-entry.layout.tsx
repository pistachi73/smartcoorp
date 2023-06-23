import React, { FC } from 'react';
import styled from 'styled-components';

import { Body } from '@smartcoorp/ui/body';
import { Breadcrumb } from '@smartcoorp/ui/breadcrumb';
import { Button } from '@smartcoorp/ui/button';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceL, spaceM, spaceS, spaceXL } from '@smartcoorp/ui/tokens';

type EditLayoutProps = {
  children: React.ReactNode;
  title: string;
  onDelete?: () => void;
  onSave?: () => void;
  entryId?: string;
  isLoading?: boolean;
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

const EditLayoutContentContainer = styled.form`
  width: 100%;
`;

const EditLayoutHeaderActions = styled.div`
  height: 100%;
  display: flex;
  gap: ${spaceS};
  justify-content: flex-end;
  align-items: flex-end;
`;

export const EditEntryLayout: FC<EditLayoutProps> = ({
  children,
  entryId,
  title,
  onDelete,
  onSave,
  isLoading,
}) => {
  return (
    <EditLayoutContainer>
      <Breadcrumb homeUrl="/home" />
      <EditLayoutHeader>
        <div>
          <Headline as="h1" size="xxxlarge" noMargin>
            {title} Edit Entry Panel
          </Headline>
          <Body variant="neutral" size="small" noMargin>
            {entryId
              ? `Update or delete ${title} entry with id ${entryId}`
              : `Create new ${title} entry`}
          </Body>
        </div>
        <EditLayoutHeaderActions>
          <Button
            variant="secondary"
            size="small"
            onClick={onDelete}
            disabled={isLoading}
          >
            Delete
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={onSave}
            loading={isLoading}
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
