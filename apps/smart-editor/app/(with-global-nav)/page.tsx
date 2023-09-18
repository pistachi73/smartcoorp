import { Features } from '@smart-editor/components/landing-page/features';
import { Hero } from '@smart-editor/components/landing-page/hero';
import { Pricing } from '@smart-editor/components/landing-page/pricing';
import { TryEditor } from '@smart-editor/components/landing-page/try-editor';

import prisma from '@smartcoorp/prisma';
const Page = async () => {
  const users = await prisma.user.findMany();
  return (
    <>
      {users.map((user) => (
        <div key={user.id}>{user.email}</div>
      ))}
      <Hero />
      <Features />
      <TryEditor />
      <Pricing />
    </>
  );
};

export default Page;
