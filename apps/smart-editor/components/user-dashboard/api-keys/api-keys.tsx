import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { Session, getServerSession } from 'next-auth';

import prisma from '@smartcoorp/prisma';

import { ApiKeysTable } from './api-keys-table';

export const ApiKeys = async () => {
  const session = (await getServerSession(nextAuthConfig)) as Session;

  const userId = session.id as string;

  const user = await prisma.eUser.findUnique({
    where: {
      id: userId,
    },
    include: {
      EApiKey: true,
    },
  });

  return <ApiKeysTable initialApiKeys={user?.EApiKey} userId={userId} />;
};
