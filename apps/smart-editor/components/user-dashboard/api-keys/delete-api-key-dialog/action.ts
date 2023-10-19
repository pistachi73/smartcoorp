'use server';

import prisma from '@smartcoorp/prisma';

export const deleteApiKey = async ({ apiKeyIds }: { apiKeyIds: number[] }) => {
  await prisma.eApiKey.deleteMany({
    where: {
      id: {
        in: apiKeyIds,
      },
    },
  });

  return {};
};
