import { createTRPCReact } from '@trpc/react-query';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppRouter } from '@smartcoorp/smart-backend/main';

export const trpc = createTRPCReact<AppRouter>();
