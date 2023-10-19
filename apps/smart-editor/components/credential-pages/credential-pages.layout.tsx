'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Body } from '@smartcoorp/ui/body';
import { DeviceOnly } from '@smartcoorp/ui/device-only';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceS, spaceXL } from '@smartcoorp/ui/tokens';

import {
  Container,
  FormWrapper,
  IllustrationWrapper,
  IllustrationsContainer,
  LogoImg,
} from './credential-pages.styles';

type CredentialPagesLayoutProps = {
  children: React.ReactNode;
};

export const CredentialPagesLayout = ({
  children,
}: CredentialPagesLayoutProps) => {
  return (
    <Container>
      <FormWrapper>
        {children}
        <Link href="/">
          <LogoImg
            width={36}
            height={27.87}
            src="/logo_light.svg"
            alt="SmartEditor Logo"
          />
        </Link>
      </FormWrapper>
      <DeviceOnly allowedDevices={['desktop', 'tablet']}>
        <IllustrationWrapper>
          <div
            style={{
              marginBottom: spaceXL,
            }}
          >
            <Headline
              size="large"
              sizeWide="xlarge"
              noMargin
              style={{
                marginBottom: spaceS,
                color: 'white',
              }}
            >
              The simplest way to write content
            </Headline>
            <Body size="xsmall" sizeWide="small" noMargin variant="neutral">
              Enter your credentials and start typing
            </Body>
          </div>

          <IllustrationsContainer>
            <Image
              src="/credential-pages/login-min.webp"
              alt="Credential Pages Illustration"
              fill
              style={{
                objectFit: 'contain',
              }}
              priority
            />
          </IllustrationsContainer>
        </IllustrationWrapper>
      </DeviceOnly>
    </Container>
  );
};
