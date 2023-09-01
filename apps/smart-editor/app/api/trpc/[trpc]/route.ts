import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { type NextRequest } from 'next/server';

import { appRouter, createContext } from '@smartcoorp/smart-api';

// this is the server RPC API handler

const handler = (request: NextRequest) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`incoming request ${request.url}`);
  }
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext,
  });
};

export const GET = handler;
export const POST = handler;
