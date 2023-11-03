import { updateAccount } from '@smart-editor/actions/account.actions';
import { useSingleFileUpload } from '@smart-editor/hooks/use-single-file-upload';
import { useSession } from 'next-auth/react';
import { useRef, useState } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import { toast } from 'sonner';
import styled, { css } from 'styled-components';

import Image from 'next/image';

import { Body } from '@smartcoorp/ui/body';
import { DotLoading } from '@smartcoorp/ui/dot-loading';
import { Headline } from '@smartcoorp/ui/headline';
import {
  getFocusShadow,
  gray300,
  primary,
  primary100_RGBA,
} from '@smartcoorp/ui/tokens';

import {
  FieldContainer,
  FieldContent,
  FieldFooter,
  WarningSign,
} from '../account.styles';

const StyledFieldContent = styled(FieldContent)`
  display: flex;

  align-items: center;
  justify-content: space-between;

  input {
    display: none;
  }
`;

const AvatarButton = styled.button<{ $loading?: boolean }>`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;

  border: 1px solid ${gray300};

  transition: all 0.2s ease-in-out;

  ${({ $loading }) =>
    $loading &&
    css`
      cursor: not-allowed;
      opacity: 0.5;
    `}

  &:hover {
    background-color: rgba(${primary100_RGBA}, 0.25);

    border-color: ${primary};
  }
  &:focus {
    ${getFocusShadow({})}
  }
`;

type AvatarFieldProps = {
  picture?: string | null;
};

export const AvatarField = ({ picture }: AvatarFieldProps) => {
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined | null>(
    picture
  );
  const session = useSession();
  const { handleSingleFileUpload } = useSingleFileUpload({
    folder: session?.data?.id as string,
    initialFile: picture,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 250000) {
      toast.error('File size too large. Max size: 250kb');
      return;
    }

    try {
      const avatarPicture = await handleSingleFileUpload(file);

      if (avatarPicture !== picture) {
        await updateAccount({
          userId: session.data?.id as string,
          data: {
            picture: avatarPicture as string | undefined,
          },
        });
        session.update({
          picture,
        });
      }

      setAvatarPreview(URL.createObjectURL(file));

      toast.success('Avatar updated');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <FieldContainer>
      <StyledFieldContent>
        <div>
          <Headline size="large">Avatar</Headline>
          <Body size="small">
            Upload a new avatar for your profile (Max size: 250kb)
          </Body>
          <WarningSign size="small">
            <BsExclamationCircle /> The avatar pictue takes 24 hours to update.
          </WarningSign>
        </div>
        <div>
          <AvatarButton
            $loading={loading}
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            <Image
              src={
                avatarPreview ?? '/illustrations/default-profile-picture.svg'
              }
              fill
              alt="Account avatar"
            />

            {loading && <DotLoading disabled={true} size="small" />}
          </AvatarButton>
        </div>
        <input
          ref={inputRef}
          onChange={onAvatarChange}
          accept="image/png,image/jpeg"
          aria-label="Upload Avatar"
          type="file"
        />
      </StyledFieldContent>
      {/* <FieldFooter>
        <Body size="small" variant="neutral" noMargin>
          An avatar is optional but strongly recommended
        </Body>
      </FieldFooter> */}
    </FieldContainer>
  );
};
