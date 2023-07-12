'use client';

import { clientTRPC } from '@smart-coaching/trpc';

const ClientPage = () => {
  const { data } = clientTRPC.user.getAllUsers.useQuery();

  if (!data) {
    return null;
  }

  console.log(data);
  return (
    <div>
      <h1>Hello, From the client side</h1>
      {data.map((user) => (
        <div key={user.id}>{user.id}</div>
      ))}
    </div>
  );
};

export default ClientPage;
