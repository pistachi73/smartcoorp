import { fromContentToJSON } from '@smart-editor/utils/from-content-to-json';
import { useSession } from 'next-auth/react';
import { BsCloudDownload } from 'react-icons/bs';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { DeviceOnly, useDeviceType } from '@smartcoorp/ui/device-only';
import { Headline } from '@smartcoorp/ui/headline';
import { Tooltip } from '@smartcoorp/ui/tooltip';

import { type SavingStatus } from '../post-writer';

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
  saving: SavingStatus;
  title?: string | null;
  content?: any;
};

export const Header = ({ saving, title, content }: HeaderProps) => {
  const session = useSession();
  const { postId } = useParams();
  const { deviceType } = useDeviceType();
  const savingText =
    saving === 'saving' ? 'Saving...' : saving === 'saved' ? 'Saved' : '';

  return (
    <HeaderContainer>
      <StyledWidthLimiter>
        <LeftContainer>
          <Button
            to="/posts"
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
              <DeviceOnly allowedDevices={['desktop', 'tablet']}>
                <Headline size="large" as="p" noMargin>
                  {session.data.user.name}
                </Headline>
              </DeviceOnly>

              {savingText && (
                <Body
                  data-testid="saving-text"
                  size="small"
                  variant="neutral"
                  noMargin
                >
                  {savingText}
                </Body>
              )}
            </AccountContainer>
          )}
        </LeftContainer>
        <RightContainer>
          <Link href={`/posts/${postId}`}>
            <Body size="small" variant="neutral" noMargin>
              Back to settings
            </Body>
          </Link>

          <Tooltip
            content={
              <Body size="xsmall" noMargin>
                Please refresh the page to get the latest changes.
              </Body>
            }
            trigger={
              <Button
                variant="secondary"
                size="small"
                onClick={() =>
                  fromContentToJSON({
                    title,
                    content,
                  })
                }
                {...(deviceType === 'mobile' && {
                  icon: BsCloudDownload,
                })}
              >
                {deviceType !== 'mobile' && 'Export JSON'}
              </Button>
            }
            triggerAsChild
          />

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
