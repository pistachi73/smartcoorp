// @/src/pages/dashboard/index.tsx
import type { NextPage } from 'next';

import { requireAuth } from '../../server/common/require-auth';

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Home: NextPage = () => {
  return <div>HOME</div>;
};

export default Home;
