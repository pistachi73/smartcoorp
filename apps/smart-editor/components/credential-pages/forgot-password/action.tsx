'use server';

import { randomUUID } from 'crypto';

import ResetPasswordEmail from '@smart-editor/emails/reset-password-email';
import { Resend } from 'resend';

import prisma from '@smartcoorp/prisma';

import { ForgotPasswordFormData } from '../helpers';

type Output = {
  error?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export const forgotPasswordAction = async (
  data: ForgotPasswordFormData
): Promise<Output> => {
  const { email } = data;

  const user = await prisma.eUser.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return {
      error: 'This email is not registered.',
    };
  }

  const token = await prisma.ePasswordResetToken.create({
    data: {
      userId: user.id,
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
    },
  });

  try {
    await resend.emails.send({
      from: 'SmartEditor <noreply@cookiecoaching.com>',
      to: [email],
      subject: 'Reset your password',
      react: ResetPasswordEmail({
        name: user.name,
        resetPasswordLink: `/forgot-password/${token.token}`,
      }),
    });
  } catch (err) {
    return {
      error: 'Error sending email',
    };
  }

  return {};
};
