import { Features } from '@smart-editor/components/landing-page/features';
import { Hero } from '@smart-editor/components/landing-page/hero';
import { Pricing } from '@smart-editor/components/landing-page/pricing';
import { TryEditor } from '@smart-editor/components/landing-page/try-editor';

const Page = async () => {
  return (
    <>
      <Hero />
      <Features />
      <TryEditor />
      <Pricing />
    </>
  );
};

export default Page;
