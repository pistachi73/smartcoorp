import { LoginFormSchema } from '@smart-editor/components/credential-pages/helpers';
import * as bcrypt from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import prisma from '@smartcoorp/prisma';

export type AuthorizeError = {
  message: string;
  code: number;
  data?: Record<string, any>;
};

const authorize = async (
  credentials: Record<'email' | 'password', string> | undefined
) => {
  const creds = await LoginFormSchema.parseAsync({
    email: credentials?.email,
    password: credentials?.password,
  });

  const user = await prisma.eUser.findFirst({
    where: { email: creds.email },
  });

  if (!user) {
    const error: AuthorizeError = {
      message: 'Invalid email or password.',
      code: 401,
    };

    throw new Error(JSON.stringify(error));
  }

  const isValidPassword = await bcrypt.compare(
    creds.password,
    user.password ?? ''
  );

  if (!isValidPassword) {
    const error: AuthorizeError = {
      message: 'Invalid email or password.',
      code: 401,
    };

    throw new Error(JSON.stringify(error));
  }

  if (!user.accountVerified) {
    const error: AuthorizeError = {
      message: 'Account not verified',
      code: 403,
      data: { email: user.email, name: user.name, id: user.id },
    };

    throw new Error(JSON.stringify(error));
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    picture: user.picture,
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

      if (existingUser?.provider === 'EMAIL') {
        const errorMessage = encodeURIComponent('User already exists');
        return `/login?error=${errorMessage}`;
      } else if (existingUser?.provider === 'GOOGLE') {
        return true;
      }

      const { email_verified } = profile ?? {};

      if (!email_verified) {
        const errorMessage = encodeURIComponent(
          'Please verify your email first'
        );
        return `/login?error=${errorMessage}`;
      }

      const { email, name, id, image } = user;

      if (!email || !name) {
        const errorMessage = encodeURIComponent('Email and name are required');
        return `/login?error=${errorMessage}`;
      }

      await prisma.eUser.create({
        data: {
          id,
          email,
          name,
          picture: image,
          provider: 'GOOGLE',
          accountVerified: true,
        },
      });

      return true;
    },

    session: async ({ session, token }) => {
      const user = await prisma.eUser.findFirst({
        where: { id: token.id },
        select: {
          picture: true,
        },
      });
      if (token) {
        session.id = token.id;
        session.user.name = token.name;
        session.user.picture = user?.picture;
      }

      return session;
    },
    jwt: ({ trigger, token, user, session }) => {
      if (trigger === 'update') {
        if (session.name) {
          token.name = session.name;
        }
        if (session.email) {
          token.email = session.email;
        }
        if (session.picture) {
          token.picture = session.picture;
        }
      }

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
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
