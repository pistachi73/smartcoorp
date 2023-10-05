import { Login as LoginSection } from '@smart-editor/components/credential-pages/login';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { getServerSession } from 'next-auth';

export const metadata = {
  title: 'SmartEditos Login',
  description:
    '"Welcome back to SmartEditor. Log in to unlock a world of content creation, management, and exploration. Connect with your content, your way."',
};

const Login = async () => {
  const session = await getServerSession(nextAuthConfig);

  if (session) {
    // redirect('/');
  }
  return <LoginSection />;
};

export default Login;
