import NextAuth from 'next-auth';

import { nextAuthOptions } from '@smartcoorp/smart-api';

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
