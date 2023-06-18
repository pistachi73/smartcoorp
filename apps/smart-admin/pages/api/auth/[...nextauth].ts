import NextAuth from 'next-auth';

import { nextAuthOptions } from '../../../server/common/next-auth-configuration';

export default NextAuth(nextAuthOptions);
