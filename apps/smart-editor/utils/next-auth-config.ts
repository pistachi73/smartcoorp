import { loginSchema } from '@smart-editor/components/credential-pages/login/login-form';
import * as bcrypt from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],

  callbacks: {
    signIn: async ({ user, account, profile }) => {
      if (account?.provider !== 'google') return true;

      const existingUser = await prisma.eUser.findFirst({
        where: { email: profile?.email },
      });

      if (existingUser) return true;

      const { email, name, image } = user;

      if (!email || !name || !image) return false;

      await prisma.eUser.create({
        data: {
          email,
          name,
          picture: image,
        },
      });

      return true;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.user.name = token.name;
      }

      return session;
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }

      return token;
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
