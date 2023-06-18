import type { NextPage } from 'next';

import Head from 'next/head';

import { Login } from '../components/login/login';

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
