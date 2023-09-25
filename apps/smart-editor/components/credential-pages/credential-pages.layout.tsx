'use client';

import { LayoutTransition } from '@smart-editor/components/shared/layout-transition';

import Link from 'next/link';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceS, spaceXL } from '@smartcoorp/ui/tokens';

import {
  Container,
  FormWrapper,
  Illustration,
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
          <LogoImg width={36} src="/logo_light.svg" alt="SmartEditor Logo" />
        </Link>
      </FormWrapper>
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
          <Illustration
            src="/credential-pages/login-min.webp"
            alt="Credential Pages Illustration"
          />
        </IllustrationsContainer>
      </IllustrationWrapper>
    </Container>
  );
};

const ignoreCircularReferences = () => {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (key.startsWith('_')) return; // Don't compare React's internal props.
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};
