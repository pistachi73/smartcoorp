import { Signup } from '@smart-editor/components/credential-pages/signup';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { getServerSession } from 'next-auth';

const SignupPage = async () => {
  const session = await getServerSession(nextAuthConfig);

  if (session) {
    // redirect('/');
  }
  return <Signup />;
};

export default SignupPage;
