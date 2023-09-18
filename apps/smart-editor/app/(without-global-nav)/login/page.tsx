import { Login as LoginSection } from '@smart-editor/components/credential-pages/login';
import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '@smartcoorp/smart-api';

const Login = async () => {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    // redirect('/');
  }
  return <LoginSection />;
};

export default Login;
