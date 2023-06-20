import type { GetServerSidePropsContext, NextPage } from 'next';
import { getServerSession } from 'next-auth';

import Head from 'next/head';

import { Login } from '../components/login/login';
import { nextAuthOptions } from '../server/common/next-auth-configuration';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);
  if (session) {
    return {
      redirect: {
        destination: 'home', // login path
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login in Smart Admin</title>
        <meta name="description" content="SmartAdmin loging" />
        <link rel="icon" href="/logo.ico" />
      </Head>

      <Login />
    </>
  );
};

export default Home;
