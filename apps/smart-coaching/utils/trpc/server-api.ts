import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '@smartcoorp/smart-api';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${4201}`; // dev SSR should use localhost
};

export const serverTRPC = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })],
} as any);
