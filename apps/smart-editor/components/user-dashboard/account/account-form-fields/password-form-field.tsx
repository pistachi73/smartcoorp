import { updateAccount } from '@smart-editor/actions/account.actions';
import {
  PasswordSchema,
  passwordInputValidator,
} from '@smart-editor/components/credential-pages/helpers';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
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
} from '../account.styles';

const PasswordFieldFormSchema = z.object({
  password: PasswordSchema,
  confirmPassword: PasswordSchema,
});

type PasswordFieldForm = z.infer<typeof PasswordFieldFormSchema>;

type PasswordFieldProps = {};

export const PasswordField = () => {
  const session = useSession();
  const { control, handleSubmit, watch, reset } = useForm<PasswordFieldForm>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: updatePassword, isLoading } = useMutation({
    mutationFn: updateAccount,

    onSettled: () => {
      toast.success('Password updated');
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  const onSubmit = handleSubmit(async (data: PasswordFieldForm) => {
    if (data.password != data.confirmPassword) {
      toast.error('Your passwords do not match');
      return;
    }

    await updatePassword({
      userId: session.data?.id as string,
      data: {
        password: data.password,
      },
    });

    reset({
      password: '',
      confirmPassword: '',
    });
  });

  return (
    <FieldContainer as="form" onSubmit={onSubmit}>
      <FieldContent>
        <Headline size="large">Password</Headline>
        <Body size="small">
          Your password must be at least 8 characters long and contain at least
          one uppercase letter, one lowercase letter, one number, and one
          special character.
        </Body>

        <FormFieldContainer>
          <RHFFormField
            control={control}
            label="Password"
            name="password"
            size="small"
            type="password"
            rules={passwordInputValidator}
            isDisabled={isLoading}
          />
        </FormFieldContainer>

        <FormFieldContainer>
          <RHFFormField
            control={control}
            label="Confirm Password"
            name="confirmPassword"
            size="small"
            type="password"
            rules={{
              required: 'Please confirm your password',
              validate: (confirmPassword: string) => {
                if (watch('password') != confirmPassword) {
                  return 'Your passwords do no match';
                }
              },
            }}
            isDisabled={isLoading}
          />
        </FormFieldContainer>
        {/* {children} */}
      </FieldContent>
      <FieldFooter>
        <Body size="small" variant="neutral" noMargin>
          Enter a secure password that you can remember
        </Body>
        <Button size="small" type="submit" loading={isLoading}>
          Save
        </Button>
      </FieldFooter>
    </FieldContainer>
  );
};
