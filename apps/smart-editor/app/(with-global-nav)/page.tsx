import { Features } from '@smart-editor/components/landing-page/features';
import { Hero } from '@smart-editor/components/landing-page/hero';
import { Pricing } from '@smart-editor/components/landing-page/pricing';

import dynamic from 'next/dynamic';

const DynamicTryEditor = dynamic(
  () => import('@smart-editor/components/landing-page/try-editor'),
  { ssr: false }
);

const Page = async () => {
  return (
    <>
      <Hero />
      <Features />
      <DynamicTryEditor />
      <Pricing />
    </>
  );
};

export default Page;
