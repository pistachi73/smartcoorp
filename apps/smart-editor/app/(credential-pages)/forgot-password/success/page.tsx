import { ForgotPasswordSuccess } from '@smart-editor/components/credential-pages/forgot-password';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot password? Reset it with SmartEditor - Success',
};

const ForgotPasswordSuccessPage = () => {
  return <ForgotPasswordSuccess />;
};

export default ForgotPasswordSuccessPage;
