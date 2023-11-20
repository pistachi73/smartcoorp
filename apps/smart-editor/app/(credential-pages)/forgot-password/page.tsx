import { ForgotPassword } from '@smart-editor/components/credential-pages/forgot-password';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot password? Reset it with SmartEditor',
  description:
    'Lost access to your account? No worries. Enter your email to receive a password reset link from Smarteditor. Easily regain access to your writing world and continue your creative journey with a new password.',
};

const ForgotPasswordPage = () => {
  return <ForgotPassword />;
};

export default ForgotPasswordPage;
