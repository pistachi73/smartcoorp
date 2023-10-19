'use client';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { BsBoxArrowInRight, BsThreeDotsVertical } from 'react-icons/bs';

import { useRouter } from 'next/navigation';

import { Body } from '@smartcoorp/ui/body';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@smartcoorp/ui/dropdown-menu';

import {
  Profile,
  ProfileContent,
  ProfileDropdownContent,
  ProfileImage,
  ProfileInformation,
} from './user-dashboard.layout.styles';

type ProfileDropdownProps = {
  session: Session;
};

export const ProfileDropdown = ({ session }: ProfileDropdownProps) => {
  const router = useRouter();

  const logout = () => {
    signOut();
    router.push('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Profile>
          <ProfileContent>
            <ProfileImage>
              <img
                src={
                  session.user.picture ??
                  '/illustrations/default-profile-picture.svg'
                }
                alt="Profile Image"
              />
            </ProfileImage>
            <ProfileInformation>
              <Body size="small" noMargin fontWeight="bold" ellipsis>
                {session.user.name}
              </Body>
              <Body size="xsmall" noMargin variant="neutral" ellipsis>
                {session.user.email}
              </Body>
            </ProfileInformation>
          </ProfileContent>

          <BsThreeDotsVertical size={22} />
        </Profile>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={5}
        align="start"
        side="top"
        style={{
          width: 'var(--radix-popper-anchor-width)',
        }}
      >
        <ProfileDropdownContent>
          <DropdownMenuItem onClick={logout}>
            <BsBoxArrowInRight size={18} />
            <Body size="small" noMargin>
              Logout
            </Body>
          </DropdownMenuItem>
        </ProfileDropdownContent>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
