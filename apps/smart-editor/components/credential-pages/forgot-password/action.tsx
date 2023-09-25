'use server';

import { randomUUID } from 'crypto';

import { render } from '@react-email/render';
import { sendEmail } from '@smart-editor/actions/send-email';
import ResetPasswordEmail from '@smart-editor/emails/reset-password-email';

import prisma from '@smartcoorp/prisma';

import { ForgotPasswordFormData } from '../helpers';

type Output = {
  success: boolean;
  error?: string;
};

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
      success: false,
      error: 'This email is not registered.',
    };
  }

  const token = await prisma.ePasswordResetToken.create({
    data: {
      userId: user.id,
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
    },
  });

  const emailHtml = render(
    <ResetPasswordEmail
      userFirstname={user.name}
      resetPasswordLink={`/forgot-password/${token.token}`}
    />
  );

  try {
    sendEmail({
      emailTo: email,
      subject: 'Reset your password',
      htmlBody: emailHtml,
    });
  } catch (e) {
    return {
      success: false,
      error: 'Failed to send email',
    };
  }

  return {
    success: true,
  };
};
