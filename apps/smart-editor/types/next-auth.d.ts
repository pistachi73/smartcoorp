import { Prisma } from '@prisma/client';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    name?: string;
    picture?: string;
  }

  interface Session {
    id?: string;
    user: User;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    /** OpenID ID Token */
    idToken?: string;
    name?: string;
    picture?: string;
  }
}
