'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Headline } from '@smartcoorp/ui/headline';

import { Footer } from '../global-navigation/footer';
import { Header } from '../global-navigation/header';

import {
  Container,
  Content,
  IllustrationContainer,
  InternalServerErrorIllustrationContainer,
  InternalServerErrorTextContainer,
} from './error-pages.styles';

export const InternalServerError = () => {
  const router = useRouter();
  const handleRefresh = () => {
    router.refresh();
  };
  return (
    <Content data-testid="internal-server-error">
      <InternalServerErrorIllustrationContainer>
        <Image
          src="illustrations/500-internal-server-error.svg"
          alt="505 Internal Server Error"
          fill
        />
      </InternalServerErrorIllustrationContainer>
      <InternalServerErrorTextContainer>
        <div>
          <Headline as="p" size="xxlarge">
            Internal Server Error
          </Headline>
          <Body>
            Unfortunately, we couldn&apos;t process your request. Try again
            later.
          </Body>
        </div>
        <Button variant="secondary" onClick={handleRefresh}>
          Retry
        </Button>
      </InternalServerErrorTextContainer>
    </Content>
  );
};
