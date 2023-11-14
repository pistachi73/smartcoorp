import { EPostStatus } from '@prisma/client';
import {
  FieldContainer,
  FieldContent,
  InputContainer,
} from '@smart-editor/components/shared/styled-form-field';
import { FieldFooter } from '@smart-editor/components/user-dashboard/account/account.styles';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useParams } from 'next/navigation';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Headline } from '@smartcoorp/ui/headline';
import { RHFSelect } from '@smartcoorp/ui/select';

import { useUpdatePost } from '../../posts.hooks';

const StatusFieldFormSchema = z.object({
  status: z.nativeEnum(EPostStatus),
});

type StatusFieldForm = z.infer<typeof StatusFieldFormSchema>;

type StatusFieldProps = {
  status: EPostStatus;
};

export const StatusField = ({ status }: StatusFieldProps) => {
  const { postId } = useParams();
  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<StatusFieldForm>({
    defaultValues: {
      status,
    },
  });

  const { mutateAsync: updateStatus, isLoading } = useUpdatePost({
    field: 'status',
  });

  useEffect(() => {
    reset({
      status,
    });
  }, [status, reset]);

  const onSubmit = handleSubmit(async (data: StatusFieldForm) => {
    await updateStatus({
      postId,
      data,
    });

    reset({}, { keepValues: true });
  });

  return (
    <FieldContainer as="form" onSubmit={onSubmit}>
      <FieldContent>
        <Headline size="large">Status</Headline>
        <Body size="small">
          Set the status—draft, or published. Direct your post to its
          destination on the path to reader engagement.
        </Body>

        <InputContainer>
          <RHFSelect
            size="small"
            options={[
              {
                value: 'DRAFT',
                label: 'Draft',
              },
              {
                value: 'PUBLISHED',
                label: 'Published',
              },
            ]}
            control={control}
            name="status"
          />
        </InputContainer>
      </FieldContent>

      <FieldFooter>
        <Body noMargin size="small" variant="neutral">
          Drafts are visible only to you and can be published at any time.
        </Body>
        <Button
          size="small"
          type="submit"
          disabled={!isDirty}
          loading={isLoading}
        >
          Save
        </Button>
      </FieldFooter>
    </FieldContainer>
  );
};
