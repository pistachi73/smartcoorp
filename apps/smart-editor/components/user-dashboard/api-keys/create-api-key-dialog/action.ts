'use server';

import prisma from '@smartcoorp/prisma';

import { type CreateApiKeyData } from './create-api-key-dialog';

type Input = {
  userId: number;
  apiKeyToken: string;
  data: CreateApiKeyData;
};

export const createApiKey = async ({ userId, apiKeyToken, data }: Input) => {
  const { name } = data;

  const apiKey = await prisma.eApiKey.create({
    data: {
      name,
      userId,
      key: apiKeyToken,
    },
  });

  if (!apiKey) {
    return {
      error: 'Error creating api key',
    };
  }

  return { apiKey };
};
