import { serverTRPC } from '@smart-coaching/trpc';

import ClientPage from './test';

const Page = async () => {
  const data = await serverTRPC.user.getAllUsers.query();
  const user = await serverTRPC.user.getUserById.query(6);

  return (
    <>
      <div>
        <h1>Hello, Next.js!</h1>
        {data.map((user) => (
          <div key={user.id}>{user.id}</div>
        ))}
        <div>{user.username}</div>
      </div>
      <ClientPage />
    </>
  );
};

export default Page;
