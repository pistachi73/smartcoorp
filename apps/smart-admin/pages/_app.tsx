import styled from 'styled-components';

import { AppProps } from 'next/app';
import Head from 'next/head';

import { Body, GlobalStyles, ThemeProvider } from '@smartcoorp/smart-design';
import {
  scale000,
  scale010,
  scale020,
  scale070,
} from '@smartcoorp/smart-design/tokens';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme="light">
      <GlobalStyles>
        <Head>
          <title>Welcome to smart-admin!</title>
        </Head>
        <main className="app">
          <Component {...pageProps} />
          <Body ellipsis size="xlarge">
            sadas
          </Body>
        </main>
      </GlobalStyles>
    </ThemeProvider>
  );
}

export default CustomApp;
