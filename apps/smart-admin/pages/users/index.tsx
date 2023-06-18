// @/src/pages/dashboard/index.tsx
import type { NextPage } from 'next';

import { requireAuth } from '../../server/common/require-auth';

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Users: NextPage = () => {
  return <div>USERS</div>;
};

export default Users;
