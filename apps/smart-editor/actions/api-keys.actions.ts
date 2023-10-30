'use server';

import { z } from 'zod';

import prisma from '@smartcoorp/prisma';

const getApiKeysSchema = z.object({
  userId: z.string(),
});

export type GetApiKeysInput = z.infer<typeof getApiKeysSchema>;

export const getApiKeys = async (input: GetApiKeysInput) => {
  const { userId } = await getApiKeysSchema.parseAsync(input);

  const apiKeys = await prisma.eApiKey.findMany({
    where: {
      userId,
    },
  });

  return { apiKeys };
};

const createApiKeySchema = z.object({
  userId: z.string(),
  apiKeyToken: z.string(),
  apiKeyName: z.string(),
});

export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>;

export const createApiKey = async (input: CreateApiKeyInput) => {
  const { userId, apiKeyToken, apiKeyName } =
    await createApiKeySchema.parseAsync(input);

  const apiKey = await prisma.eApiKey.create({
    data: {
      userId,
      key: apiKeyToken,
      name: apiKeyName,
    },
  });

  return { apiKey };
};

const deleteApiKeySchema = z.object({
  apiKeyIds: z.array(z.string()),
});

export type DeleteApiKeyInput = z.infer<typeof deleteApiKeySchema>;

export const deleteApiKey = async (input: DeleteApiKeyInput) => {
  const { apiKeyIds } = await deleteApiKeySchema.parseAsync(input);

  await prisma.eApiKey.deleteMany({
    where: {
      id: {
        in: apiKeyIds,
      },
    },
  });

  return {};
};
