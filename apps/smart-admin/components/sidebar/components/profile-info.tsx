'use client';

import { signOut, useSession } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';
import styled from 'styled-components';

import Image from 'next/image';

import { useBreakpoint } from '@smartcoorp/smart-hooks';
import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { mediaWide, spaceL, spaceM, spaceS } from '@smartcoorp/ui/tokens';

const xSpacing = spaceM;
const xSpacingWide = spaceL;

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${xSpacing};
  @media (${mediaWide}) {
    margin: ${xSpacingWide};
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: ${spaceS};
`;

export const ProfileInfo = () => {
  const { isWide } = useBreakpoint();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <ProfileContainer>
      {isWide ? (
        <Info>
          <Image
            src="/avatar.png"
            alt="Profile Avatar Image"
            width={40}
            height={40}
          />
          <div>
            <Body size="small" fontWeight="bold" noMargin>
              {session?.user.username}
            </Body>
            <Body size="xsmall" variant="neutral" noMargin>
              {session?.user.email}
            </Body>
          </div>
        </Info>
      ) : null}

      <Button
        icon={BiLogOut}
        variant="text"
        color="neutral"
        size={isWide ? 'medium' : 'small'}
        onClick={handleSignOut}
      />
    </ProfileContainer>
  );
};
