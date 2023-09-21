import { Login as LoginSection } from '@smart-editor/components/credential-pages/login';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { getServerSession } from 'next-auth';

const Login = async () => {
  const session = await getServerSession(nextAuthConfig);

  if (session) {
    // redirect('/');
  }
  return <LoginSection />;
};

export default Login;
