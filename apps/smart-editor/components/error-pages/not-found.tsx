import Image from 'next/image';
import Link from 'next/link';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';

import { Footer } from '../global-navigation/footer';
import { Header } from '../global-navigation/header';

import {
  Container,
  Content,
  IllustrationContainer,
  TextContainer,
} from './error-pages.styles';

export const NotFound = () => {
  return (
    <Container>
      <Header />
      <Content>
        <IllustrationContainer>
          <Image
            src="illustrations/404-not-found.svg"
            alt="404 Not Found"
            fill
          />
        </IllustrationContainer>
        <TextContainer>
          <Headline size="xxlarge">Page not found</Headline>
          <Body>
            Unfortunately, we couldn&apos;t find the page you were looking for.
            Try checking your URL or return to our{' '}
            <Link href={'/'}>home page</Link>.
          </Body>

          <Body>
            Here are other helpful links to get you started with SmartEditor:
          </Body>
          <ul>
            <li>
              <Link href="/posts">Create a Post</Link>
            </li>
            <li>
              <Link href="/api-keys">Create an API Key</Link>
            </li>
            <li>
              <Link href="/api-reference">
                Learn how to use SmartEditor API
              </Link>
            </li>
            <li>
              <Link href="/json-rendering">
                Learn how to render SmartEditor content in JSON format
              </Link>
            </li>
            <li>
              <Body>
                If you are not sure where to go, feel free to email us at{' '}
                <Link href="mailto:oscarpulido98@gmail.com">
                  oscarpulido98@gmail.com
                </Link>
              </Body>
            </li>
          </ul>
        </TextContainer>
      </Content>
      <Footer />
    </Container>
  );
};
