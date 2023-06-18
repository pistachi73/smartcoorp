import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { ReactElement } from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { GlobalStyles, ThemeProvider } from '@smartcoorp/ui/global-styles';

import { FullScreenLayout } from '../components/layout/full-screen-layout';
import { SidebarLayout } from '../components/layout/sidebar-layout';
import { trpc } from '../utils/trpc';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  const Layout = router.pathname === '/' ? FullScreenLayout : SidebarLayout;
  return getLayout(
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme="light">
        <GlobalStyles />

        <Head>
          <title>Welcome to Smart admin</title>
          <link rel="icon" href="/logo.svg" />
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(CustomApp);
