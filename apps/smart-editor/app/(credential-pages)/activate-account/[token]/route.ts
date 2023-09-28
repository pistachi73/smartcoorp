import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

import prisma from '@smartcoorp/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  const user = await prisma.eUser.findFirst({
    where: {
      EAccountVerificationToken: {
        some: {
          AND: [
            {
              activatedAt: null,
            },
            {
              createdAt: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
              },
            },
            { token },
          ],
        },
      },
    },
  });

  if (!user) {
    redirect('/activate-account/failure');
  }

  await prisma.eUser.update({
    where: {
      id: user.id,
    },
    data: {
      accountVerified: true,
    },
  });

  await prisma.eAccountVerificationToken.update({
    where: {
      token,
    },
    data: {
      activatedAt: new Date(),
    },
  });

  redirect('/activate-account/success');
}
