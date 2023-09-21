import { CredentialPagesLayout } from '@smart-editor/components/credential-pages/credential-pages.layout';

const WithoutGlobalNavLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <CredentialPagesLayout>{children}</CredentialPagesLayout>;
};

export default WithoutGlobalNavLayout;
