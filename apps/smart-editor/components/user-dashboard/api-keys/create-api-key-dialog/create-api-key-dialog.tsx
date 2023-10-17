import { EApiKey } from '@prisma/client';
import { set } from 'date-fns';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsClipboard } from 'react-icons/bs';
import { IoWarning } from 'react-icons/io5';
import { toast } from 'sonner';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Dialog, DialogContent } from '@smartcoorp/ui/dialog';
import { RHFFormField } from '@smartcoorp/ui/form-field';
import { Headline } from '@smartcoorp/ui/headline';
import { Modal, ModalContent } from '@smartcoorp/ui/modal';
import { spaceM, spaceXXS } from '@smartcoorp/ui/tokens';
import { Tooltip } from '@smartcoorp/ui/tooltip';

import { createApiKey } from './action';
import {
  ApiKeyContainer,
  CTAContainer,
  Form,
  StyledModalContent,
  WarningContainer,
} from './create-api-key-dialog.styles';

type CreateApiKeyDialogProps = {
  userId: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setApiKeysState: Dispatch<SetStateAction<EApiKey[]>>;
};

const CreateApiKeySchema = z.object({
  name: z.string().nonempty(),
});

export type CreateApiKeyData = z.infer<typeof CreateApiKeySchema>;

export const CreateApiKeyDialog = ({
  userId,
  isOpen = false,
  setIsOpen,
  setApiKeysState,
}: CreateApiKeyDialogProps) => {
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [apiKeyToken, setApiKeyToken] = useState(uuid().replace(/-/g, ''));
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset } = useForm<CreateApiKeyData>({
    defaultValues: {
      name: '',
    },
  });

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    setApiKeyCopied(false);
    setApiKeyToken(uuid().replace(/-/g, ''));
    reset();
  };

  const onSubmit = async (data: CreateApiKeyData) => {
    setLoading(true);

    const { error, apiKey } = await createApiKey({
      data,
      userId,
      apiKeyToken,
    });

    if (error) {
      toast.error(error);
    } else {
      onOpenChange(false);
      if (apiKey) {
        setApiKeysState((apiKeys) => [...apiKeys, apiKey]);
      }
      toast.success('Api key created successfully');
    }

    setLoading(false);
  };

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <StyledModalContent
        title="Add a new API Key"
        description="Use the REST API with the newly generated API Key"
        {...(loading
          ? {
              onPointerDownOutside: (e: any) => {
                e.preventDefault();
              },
            }
          : {})}

        // onAction={onDelete}
        // onCancel={onCancel}
        // actionLabel={`Create API Key`}
        // cancelLabel="Cancel"
        // disabled={!apiKeyCopied}
        // // loading={isLoading}
        // variant="success"
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
              Api Key Token
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
              loading={loading}
            >
              Create API Key
            </Button>
          </CTAContainer>
        </Form>
      </StyledModalContent>
    </Modal>
  );
};
