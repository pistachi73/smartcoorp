import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { withTRPC } from '@trpc/next';
import { createTRPCReact, httpBatchLink } from '@trpc/react-query';
import { useState } from 'react';
import superjson from 'superjson';

import { AppProps } from 'next/app';
import Head from 'next/head';

import { Body, GlobalStyles, ThemeProvider } from '@smartcoorp/smart-design';

import { trpc } from '../server/trpc';

function CustomApp({ Component, pageProps }: AppProps) {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8080/trpc',
        }),
      ],
    })
  );

  const [queryClient] = useState(() => new QueryClient());

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme="light">
          <GlobalStyles />
          <Head>
            <title>Welcome to smart-admin!</title>
          </Head>
          <main className="app">
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default CustomApp;
