import { getServerSession } from 'next-auth';

import { redirect } from 'next/navigation';

import { nextAuthOptions } from '@smartcoorp/smart-api';

const Page = async () => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/login');
  } else {
    redirect('/home');
  }
};

export default Page;
