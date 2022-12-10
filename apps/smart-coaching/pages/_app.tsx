import { AppProps } from 'next/app';
import Head from 'next/head';

import { trpc } from '@smartcoorp/trpc';

import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to smart-coaching!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default trpc.withTRPC(CustomApp);
