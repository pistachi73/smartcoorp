import { getBaseUrl } from '@smart-editor/components/trpc';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import { type AppRouter } from '@smartcoorp/smart-api';

export const serverTRPC = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })],
} as any);
