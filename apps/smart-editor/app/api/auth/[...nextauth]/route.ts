import NextAuth from 'next-auth';

import { smartEditorAuthConfig } from '@smartcoorp/smart-api';

const handler = NextAuth(smartEditorAuthConfig);

export { handler as GET, handler as POST };
