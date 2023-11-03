import { updateAccount } from '@smart-editor/actions/account.actions';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { BsExclamationCircle } from 'react-icons/bs';
import { toast } from 'sonner';
import { z } from 'zod';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { RHFFormField } from '@smartcoorp/ui/form-field';
import { Headline } from '@smartcoorp/ui/headline';

import {
  FieldContainer,
  FieldContent,
  FieldFooter,
  FormFieldContainer,
  WarningSign,
} from '../account.styles';

const NameFieldFormSchema = z.object({
  name: z.string(),
});

type NameFieldForm = z.infer<typeof NameFieldFormSchema>;

type NameFieldProps = {
  name: string;
  isGoogleUser: boolean;
};

export const NameField = ({ name, isGoogleUser }: NameFieldProps) => {
  const session = useSession();
  const { control, handleSubmit } = useForm<NameFieldForm>({
    defaultValues: {
      name,
    },
  });

  const { mutate: updateName, isLoading } = useMutation({
    mutationFn: updateAccount,

    onSettled: () => {
      toast.success('Name updated');
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  const onSubmit = handleSubmit(async (data: NameFieldForm) => {
    await updateName({
      userId: session.data?.id as string,
      data: {
        name: data.name,
      },
    });
    session.update({
      name: data.name,
    });
  });

  return (
    <FieldContainer as="form" onSubmit={onSubmit}>
      <FieldContent>
        <Headline size="large">Name</Headline>
        <Body size="small">
          Please enter your full name, or a display name you are comfortable
          with.
        </Body>
        {isGoogleUser && (
          <WarningSign size="small">
            <BsExclamationCircle /> You are using Google to log in. You cannot
            change your name address.
          </WarningSign>
        )}
        <FormFieldContainer>
          <RHFFormField
            control={control}
            name="name"
            size="small"
            isDisabled={isGoogleUser || isLoading}
            rules={{
              required: 'Please enter a name',
            }}
          />
        </FormFieldContainer>
      </FieldContent>
      <FieldFooter>
        <Body size="small" variant="neutral" noMargin>
          Please use a unique name
        </Body>
        <Button
          size="small"
          type="submit"
          disabled={isGoogleUser}
          loading={isLoading}
        >
          Save
        </Button>
      </FieldFooter>
    </FieldContainer>
  );
};
