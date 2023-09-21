import { ResetPassword } from '@smart-editor/components/credential-pages/reset-password';

type ResetPasswordPageProps = {
  params: {
    token: string;
  };
};

const ResetPasswordPage = async ({
  params: { token },
}: ResetPasswordPageProps) => {
  return <ResetPassword />;
};

export default ResetPasswordPage;
