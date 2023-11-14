'use server';

import { randomUUID } from 'crypto';

import { EAccountVerificationToken } from '@prisma/client';
import { PasswordSchema } from '@smart-editor/components/credential-pages/helpers';
import VerifyAccountEmail from '@smart-editor/emails/activate-account-email';
import ResetPasswordEmail from '@smart-editor/emails/reset-password-email';
import * as bcrypt from 'bcrypt';
import { Resend } from 'resend';
import { z } from 'zod';

import prisma from '@smartcoorp/prisma';

const AccountActionSchema = z.object({
  userId: z.string(),
});

export type AccountActionInput = z.infer<typeof AccountActionSchema>;

export const getAccount = async (input: AccountActionInput) => {
  const { userId } = await AccountActionSchema.parseAsync(input);

  const user = await prisma.eUser.findUnique({
    where: {
      id: userId,
    },
  });

  return {
    user,
  };
};

const UpdateAccountActionSchema = AccountActionSchema.extend({
  data: z
    .object({
      name: z.string(),
      email: z.string().email(),
      accountVerified: z.boolean(),
      password: PasswordSchema,
      picture: z.string().url(),
    })
    .partial(),
});
type UpdateAccountActionInput = z.infer<typeof UpdateAccountActionSchema>;

export const updateAccount = async (input: UpdateAccountActionInput) => {
  const { data, userId } = await UpdateAccountActionSchema.parseAsync(input);

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const user = await prisma.eUser.update({
    where: {
      id: userId,
    },
    data,
  });

  return { user };
};

export const deleteAccount = async (input: AccountActionInput) => {
  const { userId } = await AccountActionSchema.parseAsync(input);

  const deletedUser = await prisma.eUser.delete({
    where: {
      id: userId,
    },
  });

  return { deletedUser };
};

const SendAccountVerificationEmailActionSchema = AccountActionSchema.extend({
  name: z.string(),
  email: z.string().email(),
});

type SendAccountVerificationEmailActionInput = z.infer<
  typeof SendAccountVerificationEmailActionSchema
>;

export const sendAccountVerificationEmail = async (
  input: SendAccountVerificationEmailActionInput
) => {
  const { name, email, userId } =
    await SendAccountVerificationEmailActionSchema.parseAsync(input);

  const resend = new Resend(process.env.RESEND_API_KEY);

  const enabledActivationToken =
    await prisma.eAccountVerificationToken.findFirst({
      where: {
        AND: [
          {
            userId,
          },
          {
            // Token is valid for 4 hours
            createdAt: {
              gte: new Date(Date.now() - 1000 * 60 * 60 * 4),
            },
          },
        ],
      },
    });

  let newActivationToken;

  if (
    (enabledActivationToken?.resendAt ?? 0) >=
    new Date(Date.now() - 1000 * 60 * 30)
  ) {
    throw new Error(
      'Please wait 30 minutes before resending the verification email again.'
    );
  }

  if (!enabledActivationToken) {
    newActivationToken = await prisma.eAccountVerificationToken.create({
      data: {
        userId,
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
      },
    });
  }

  const token: EAccountVerificationToken | undefined =
    enabledActivationToken || newActivationToken;

  if (!token) {
    throw new Error('Unable to get account verification token.');
  }

  await resend.emails.send({
    from: 'SmartEditor <noreply@cookiecoaching.com>',
    to: [email],
    subject: 'Activate your account',
    react: VerifyAccountEmail({
      name,
      activateAccountLink: `/activate-account/${token.token}`,
    }),
  });

  await prisma.eAccountVerificationToken.update({
    where: {
      id: token.id,
    },
    data: {
      resendAt: new Date(),
    },
  });
};

const SendForgotPasswordEmailActionSchema = z.object({
  email: z.string().email(),
});

type SendForgotPasswordEmailActionInput = z.infer<
  typeof SendForgotPasswordEmailActionSchema
>;

export const sendForgotPasswordEmail = async (
  input: SendForgotPasswordEmailActionInput
) => {
  const { email } = await SendForgotPasswordEmailActionSchema.parseAsync(input);
  const resend = new Resend(process.env.RESEND_API_KEY);

  const user = await prisma.eUser.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('This email is not registered.');
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
  } catch (error) {
    throw new Error('Unable to send email');
  }
};

const ResetPasswordActionSchema = z.object({
  password: PasswordSchema,
  confirmPassword: PasswordSchema,
  token: z.string(),
});

type ResetPasswordActionInput = z.infer<typeof ResetPasswordActionSchema>;

export const resetPassword = async (input: ResetPasswordActionInput) => {
  const { password, confirmPassword, token } =
    await ResetPasswordActionSchema.parseAsync(input);

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match. Please try again.');
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
    throw new Error('Invalid or expired password reset token.');
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

  await prisma.$transaction([updateUser, updateToken]);
};

const SignUpActionSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: PasswordSchema,
});

type SignUpActionInput = z.infer<typeof SignUpActionSchema>;

export const signUp = async (input: SignUpActionInput) => {
  const { name, email, password } = await SignUpActionSchema.parseAsync(input);

  const userExists = await prisma.eUser.findFirst({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new Error('User already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await prisma.eUser.create({
    data: { name, email, password: hashedPassword },
  });

  await sendAccountVerificationEmail({
    name,
    email,
    userId: createdUser.id,
  });
};
