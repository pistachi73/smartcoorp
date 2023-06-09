import { AppProps } from 'next/app';
import Head from 'next/head';

import { GlobalStyles, ThemeProvider } from '@smartcoorp/smart-design';
import { trpc } from '@smartcoorp/trpc';

import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme="light">
        <GlobalStyles />
        <Head>
          <title>Welcome to smart-admin!</title>
        </Head>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}

export default trpc.withTRPC(CustomApp);
