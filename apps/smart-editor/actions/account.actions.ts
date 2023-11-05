'use server';

import { randomUUID } from 'crypto';

import { EAccountVerificationToken } from '@prisma/client';
import { PasswordSchema } from '@smart-editor/components/credential-pages/helpers';
import VerifyAccountEmail from '@smart-editor/emails/activate-account-email';
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
