'use server';

import { randomUUID } from 'crypto';

import { render } from '@react-email/render';
import { sendEmail } from '@smart-editor/actions/send-email';
import VerifyAccountEmail from '@smart-editor/emails/activate-account-email';
import * as bcrypt from 'bcrypt';

import prisma from '@smartcoorp/prisma';

import type { SignupFormData } from '../helpers';

type Output = {
  error?: string;
};

export const signupAction = async ({
  email,
  password,
  name,
}: SignupFormData): Promise<Output> => {
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

  const emailHtml = render(
    <VerifyAccountEmail
      name={createdUser.name}
      activateAccountLink={`/activate-account/${activationToken.token}`}
    />
  );

  try {
    sendEmail({
      emailTo: email,
      subject: 'Activate your account',
      htmlBody: emailHtml,
    });
  } catch (e) {
    return {
      error: 'Failed to send email',
    };
  }

  return {};
};
