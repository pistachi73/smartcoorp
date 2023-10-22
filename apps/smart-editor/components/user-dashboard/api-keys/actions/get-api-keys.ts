'use server';

import { type EApiKey } from '@prisma/client';

import prisma from '@smartcoorp/prisma';

export const getApiKeys = async ({ userId }: { userId: string }) => {
  let apiKeys: EApiKey[];
  try {
    apiKeys = await prisma.eApiKey.findMany({
      where: {
        userId,
      },
    });
  } catch (e) {
    throw new Error('Failed to get api keys.');
  }

  return apiKeys;
};
