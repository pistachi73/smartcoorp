import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';

import { nextAuthOptions } from '@smartcoorp/smart-api';

import { Login } from '../../components/login/login';
export const metadata = {
  title: 'Login in Smart Admin',
  description: 'Login in Smart Admin',
};

const LoginPage = async () => {
  const session = await getServerSession(nextAuthOptions);
  // if (session) {
  //   return redirect('/home');
  // }

  return <Login />;
};

export default LoginPage;
