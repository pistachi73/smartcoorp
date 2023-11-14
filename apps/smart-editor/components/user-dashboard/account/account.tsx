'use client';
import { getAccount } from '@smart-editor/actions/account.actions';
import { useQuery } from '@tanstack/react-query';

import { AvatarField } from './account-form-fields/avatar-field';
import { DeleteAccountField } from './account-form-fields/delete-account-field';
import { EmailField } from './account-form-fields/email-field';
import { NameField } from './account-form-fields/name-field';
import { PasswordField } from './account-form-fields/password-form-field';
import { SkeletonFormField } from './account-form-fields/skeleton-form-field';
import { FormContainer } from './account.styles';

type AccountProps = {
  userId: string;
};

export const Account = ({ userId }: AccountProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['getAccount'],
    queryFn: () =>
      getAccount({
        userId,
      }),
  });

  const isGoogleUser = data?.user?.provider === 'GOOGLE';

  return (
    <div>
      {isLoading ? (
        <SkeletonFormField />
      ) : (
        <>
          <FormContainer>
            <AvatarField picture={data?.user?.picture} />
            <EmailField
              email={data?.user?.email ?? ''}
              isGoogleUser={isGoogleUser}
            />
            <NameField
              name={data?.user?.name ?? ''}
              isGoogleUser={isGoogleUser}
            />
            {isGoogleUser ? null : <PasswordField />}
            <DeleteAccountField />
          </FormContainer>
        </>
      )}
    </div>
  );
};
