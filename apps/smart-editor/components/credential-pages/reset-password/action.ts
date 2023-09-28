'use server';

import * as bcrypt from 'bcrypt';

import prisma from '@smartcoorp/prisma';

import type { ResetPasswordFormData } from '../helpers';

type Output = {
  error?: string;
};

export const resetPasswordAction = async (
  data: ResetPasswordFormData,
  token: string
): Promise<Output> => {
  const { password, confirmPassword } = data;

  if (password !== confirmPassword) {
    return {
      error: 'Passwords do not match. Please try again.',
    };
  }

  const passwordResetToken = await prisma.ePasswordResetToken.findUnique({
    where: {
      token,
      createdAt: {
        // Token is valid for 4 hours
        gte: new Date(Date.now() - 1000 * 60 * 60 * 4),
      },
      resetAt: null,
    },
  });

  if (!passwordResetToken) {
    return {
      error: 'Invalid or expired password reset token.',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updateUser = prisma.eUser.update({
    where: {
      id: passwordResetToken.userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  const updateToken = prisma.ePasswordResetToken.update({
    where: {
      id: passwordResetToken.id,
    },
    data: {
      resetAt: new Date(),
    },
  });

  try {
    await prisma.$transaction([updateUser, updateToken]);
  } catch (error) {
    return {
      error: 'Something went wrong. Please try again.',
    };
  }

  return {};
};
