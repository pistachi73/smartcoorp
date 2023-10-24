import { CredentialPagesLayout } from '@smart-editor/components/credential-pages/credential-pages.layout';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';

const WithoutGlobalNavLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession(nextAuthConfig);

  if (session) {
    redirect('/posts');
  }
  return <CredentialPagesLayout>{children}</CredentialPagesLayout>;
};

export default WithoutGlobalNavLayout;
