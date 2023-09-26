'use server';

import { randomUUID } from 'crypto';

import VerifyAccountEmail from '@smart-editor/emails/activate-account-email';
import * as bcrypt from 'bcrypt';
import { Resend } from 'resend';

import prisma from '@smartcoorp/prisma';

import type { SignupFormData } from '../helpers';

type Output = {
  error?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export const signupAction = async ({
  email,
  password,
  name,
}: SignupFormData): Promise<Output> => {
  console.log(process.env.RESEND_API_KEY);
  const userExists = await prisma.eUser.findFirst({
    where: {
      email,
    },
  });

  if (userExists) {
    return {
      error: 'User already exists.',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await prisma.eUser.create({
    data: { name, email, password: hashedPassword },
  });

  const activationToken = await prisma.eAccountVerificationToken.create({
    data: {
      userId: createdUser.id,
      token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
    },
  });

  try {
    await resend.emails.send({
      from: 'SmartEditor <noreply@cookiecoaching.com>',
      to: [email],
      subject: 'Activate your account',
      react: VerifyAccountEmail({
        name: createdUser.name,
        activateAccountLink: `/activate-account/${activationToken.token}`,
      }),
    });
  } catch (err) {
    return {
      error: 'Error sending email',
    };
  }

  return {};
};
