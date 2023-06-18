import { signOut, useSession } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';
import styled from 'styled-components';

import Image from 'next/image';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { spaceL, spaceS, spaceXL } from '@smartcoorp/ui/tokens';

export const ProfileContainer = styled.div`
  padding-inline: ${spaceL};

  width: 100%;
  margin: ${spaceXL} 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: ${spaceS};
`;

export const ProfileInfo = () => {
  const { data: session } = useSession();
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };
  return (
    <ProfileContainer>
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
      <Button
        icon={BiLogOut}
        variant="text"
        color="neutral"
        onClick={handleSignOut}
      />
    </ProfileContainer>
  );
};
