import { loginSchema } from '@smart-editor/components/credential-pages/login/login-form';
import * as bcrypt from 'bcrypt';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleCredentials from 'next-auth/providers/google';

import prisma from '@smartcoorp/prisma';

const authorize = async (
  credentials: Record<'email' | 'password', string> | undefined
) => {
  const creds = await loginSchema.parseAsync(credentials);

  const user = await prisma.user.findFirst({
    where: { email: creds.email },
  });

  if (!user) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(creds.password, user.password);

  if (!isValidPassword) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      authorize: async (credentials) => authorize(credentials),
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.user.username = token.username;
      }

      return session;
    },
  },
  secret: '77e0063d3d627244e84c6b8a9db7e7f6',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: 'super-secret',
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: '/login',
    newUser: '/sign-up',
  },
};
