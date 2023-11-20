import { ResetPassword } from '@smart-editor/components/credential-pages/reset-password';
import { Metadata } from 'next';

import { redirect } from 'next/navigation';

import prisma from '@smartcoorp/prisma';

type ResetPasswordPageProps = {
  params: {
    token: string;
  };
};

export const metadata: Metadata = {
  title: 'Forgot password? Reset it with SmartEditor - Reset password',
};

const ResetPasswordPage = async ({
  params: { token },
}: ResetPasswordPageProps) => {
  const passwordResetToken = await prisma.ePasswordResetToken.findUnique({
    where: {
      token,
      resetAt: null,
    },
  });

  if (!passwordResetToken) {
    return redirect('/login');
  }

  return <ResetPassword />;
};

export default ResetPasswordPage;
