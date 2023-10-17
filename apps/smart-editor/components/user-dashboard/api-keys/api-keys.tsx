import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { Session, getServerSession } from 'next-auth';

import prisma from '@smartcoorp/prisma';

import { ApiKeysTable } from './api-keys-table';

export const ApiKeys = async () => {
  const session = await getServerSession(nextAuthConfig);

  const userId = (session as Session).id as number;

  const user = await prisma.eUser.findUnique({
    where: {
      id: userId,
    },
    include: {
      EApiKey: true,
    },
  });

  return <ApiKeysTable apiKeys={user?.EApiKey} userId={userId} />;
};
