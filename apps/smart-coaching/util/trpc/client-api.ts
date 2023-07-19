'use client';

import { createTRPCReact } from '@trpc/react-query';

import type { AppRouter } from '@smartcoorp/smart-api';

export const clientTRPC = createTRPCReact<AppRouter>();
