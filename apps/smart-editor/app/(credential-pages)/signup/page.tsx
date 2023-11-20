import { Signup } from '@smart-editor/components/credential-pages/signup';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { getServerSession } from 'next-auth';

export const metadata = {
  title: 'Sign up for SmartEditor',
  description:
    'Welcome to SmartEditor. Sign up to embark on your content creation journey. Start crafting your stories and articles with ease.',
};

const SignupPage = async () => {
  const session = await getServerSession(nextAuthConfig);

  if (session) {
    // redirect('/');
  }
  return <Signup />;
};

export default SignupPage;
