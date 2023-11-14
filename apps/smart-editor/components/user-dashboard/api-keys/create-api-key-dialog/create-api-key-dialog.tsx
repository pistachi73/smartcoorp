import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsClipboard } from 'react-icons/bs';
import { IoWarning } from 'react-icons/io5';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { RHFFormField } from '@smartcoorp/ui/form-field';
import { Headline } from '@smartcoorp/ui/headline';
import { Modal } from '@smartcoorp/ui/modal';
import { spaceM, spaceXXS } from '@smartcoorp/ui/tokens';
import { Tooltip } from '@smartcoorp/ui/tooltip';

import { useCreateApiKey } from '../api-keys.hooks';

import {
  ApiKeyContainer,
  CTAContainer,
  Form,
  StyledModalContent,
  WarningContainer,
} from './create-api-key-dialog.styles';

type CreateApiKeyDialogProps = {
  userId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const CreateApiKeySchema = z.object({
  name: z.string(),
});

export type CreateApiKeyData = z.infer<typeof CreateApiKeySchema>;

export const CreateApiKeyDialog = ({
  userId,
  isOpen = false,
  setIsOpen,
}: CreateApiKeyDialogProps) => {
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [apiKeyToken, setApiKeyToken] = useState(uuid().replace(/-/g, ''));

  const { control, handleSubmit, reset } = useForm<CreateApiKeyData>({
    defaultValues: {
      name: '',
    },
  });

  const { mutate: createApiKey, isLoading } = useCreateApiKey({
    onSuccess: () => {
      onOpenChange(false);
    },
  });

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    setApiKeyCopied(false);
    setApiKeyToken(uuid().replace(/-/g, ''));
    reset();
  };

  const onSubmit = async (data: CreateApiKeyData) => {
    await createApiKey({
      userId,
      apiKeyToken,
      apiKeyName: data.name,
    });
  };

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <StyledModalContent
        title="Add a new API Key"
        description="Use the REST API with the newly generated API Key"
        {...(isLoading
          ? {
              onPointerDownOutside: (e: any) => {
                e.preventDefault();
              },
            }
          : {})}
      >
        <Headline as="h2" size="medium">
          Add a new API Key
        </Headline>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <RHFFormField
            name="name"
            label="Name"
            control={control}
            rules={{
              required: 'A name is required to create an API Key',
            }}
            size="small"
          />
          <div>
            <Body
              size="xsmall"
              variant="neutral"
              style={{
                marginBottom: spaceXXS,
              }}
            >
              API Key Token
            </Body>
            <Tooltip
              align="center"
              content={
                <Body size="xsmall" noMargin>
                  Copy API Token
                </Body>
              }
              triggerAsChild
              trigger={
                <ApiKeyContainer
                  type="button"
                  onClick={() => {
                    setApiKeyCopied(true);
                    navigator.clipboard.writeText(apiKeyToken);
                  }}
                  data-testid="api-key-token"
                  $apiKeyCopied={apiKeyCopied}
                >
                  <Body size="small" variant="neutral" noMargin ellipsis>
                    {apiKeyToken}
                  </Body>
                  <BsClipboard size={14} />
                </ApiKeyContainer>
              }
            ></Tooltip>
          </div>
          <WarningContainer>
            <Headline
              size="small"
              noMargin
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spaceM,
              }}
              as="p"
            >
              <IoWarning size={20} /> WARNING
            </Headline>
            <Body size="small" noMargin variant="neutral">
              Make sure to securely copy the API key token before its creation
              (click the value), as it will not be visible again for security
              reasons.
            </Body>
          </WarningContainer>

          <CTAContainer>
            <Button
              size="small"
              type="submit"
              disabled={!apiKeyCopied}
              loading={isLoading}
            >
              Create API Key
            </Button>
          </CTAContainer>
        </Form>
      </StyledModalContent>
    </Modal>
  );
};
