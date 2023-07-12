import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from '@smartcoorp/smart-api';

const getBaseUrl = () => {
  return (
    process.env.VERCEL_URL || process.env.BASE_URL || `http://localhost:4201`
  );
};

export const serverTRPC = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })],
} as any);
