import { fromContentToJSON } from '@smart-editor/utils/from-content-to-json';
import { useSession } from 'next-auth/react';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Headline } from '@smartcoorp/ui/headline';

import {
  AccountContainer,
  AvatarContainer,
  HeaderContainer,
  LeftContainer,
  RightContainer,
  Separator,
  StyledWidthLimiter,
} from './header.styles';

type HeaderProps = {
  isSaving: boolean;
};

export const Header = ({ isSaving }: HeaderProps) => {
  const session = useSession();
  const { postId } = useParams();
  //   const session = await getServerSession(nextAuthConfig);
  return (
    <HeaderContainer>
      <StyledWidthLimiter>
        <LeftContainer>
          <Button
            to="/"
            variant="text"
            style={{
              padding: '0px',
            }}
          >
            <Image
              width={56}
              height={36.36}
              src={'/logo_light.svg'}
              alt="SmartEditor Logo"
            />
          </Button>
          <Separator />
          {session.status === 'authenticated' && (
            <AccountContainer>
              <Headline size="large" as="p" noMargin>
                {session.data.user.name}
              </Headline>
              <Body size="small" variant="neutral" noMargin>
                {isSaving ? 'Saving...' : 'All changes saved'}
              </Body>
            </AccountContainer>
          )}
        </LeftContainer>
        <RightContainer>
          <Link href={`/posts/${postId}`}>
            <Body size="small" variant="neutral" noMargin>
              Back to post settings
            </Body>
          </Link>

          <Button
            variant="secondary"
            size="small"
            onClick={() =>
              fromContentToJSON({
                title: 'title',
                content: 'content',
              })
            }
          >
            Export JSON
          </Button>

          <AvatarContainer>
            <Image
              src={
                session?.data?.user.picture ??
                '/illustrations/default-profile-picture.svg'
              }
              alt="Profile Image"
              fill
            />
          </AvatarContainer>
        </RightContainer>
      </StyledWidthLimiter>
    </HeaderContainer>
  );
};
