import { sendAccountVerificationEmail } from '@smart-editor/actions/account.actions';
import { emailnputValidator } from '@smart-editor/components/credential-pages/helpers';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { BsExclamationCircle } from 'react-icons/bs';
import { toast } from 'sonner';
import { z } from 'zod';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { RHFFormField } from '@smartcoorp/ui/form-field';
import { Headline } from '@smartcoorp/ui/headline';

import { useUpdateField } from '../account.hooks';
import {
  FieldContainer,
  FieldContent,
  FieldFooter,
  FormFieldContainer,
  WarningSign,
} from '../account.styles';

const EmailFieldFormSchema = z.object({
  email: z.string().email(),
});

type EmailFieldForm = z.infer<typeof EmailFieldFormSchema>;

type EmailFieldProps = {
  email: string;
  isGoogleUser: boolean;
};

export const EmailField = ({ email, isGoogleUser }: EmailFieldProps) => {
  const session = useSession();
  const { control, handleSubmit } = useForm<EmailFieldForm>({
    defaultValues: {
      email,
    },
  });

  const { mutate: updateEmail, isLoading } = useUpdateField({ field: 'email' });

  const onSubmit = handleSubmit(async (data: EmailFieldForm) => {
    if (data.email === email) {
      toast.error('Email is the same');
      return;
    }

    const userId = session.data?.id as string;

    await updateEmail({
      userId: session.data?.id as string,
      data: {
        email: data.email,
        accountVerified: false,
      },
    });

    session.update({
      email: data.email,
    });

    try {
      await sendAccountVerificationEmail({
        email: data.email,
        userId: userId,
        name: session.data?.user?.name as string,
      });
    } catch (error) {
      toast.error(
        'Something went wrong while sending the email. Please try again.'
      );
    }
  });

  return (
    <FieldContainer as="form" onSubmit={onSubmit}>
      <FieldContent>
        <Headline size="large">Email</Headline>
        <Body size="small">
          Please enter the email address you want to use to log in with
          SmartEditor.
        </Body>
        {isGoogleUser && (
          <WarningSign size="small">
            <BsExclamationCircle /> You are using Google to log in. You cannot
            change your email address.
          </WarningSign>
        )}
        <FormFieldContainer>
          <RHFFormField
            control={control}
            name="email"
            size="small"
            isDisabled={isGoogleUser || isLoading}
            rules={emailnputValidator}
          />
        </FormFieldContainer>
      </FieldContent>
      <FieldFooter>
        <Body size="small" variant="neutral" noMargin>
          We will email you to verify the change
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
