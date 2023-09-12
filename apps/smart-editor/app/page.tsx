import { Features } from '@smart-editor/components/landing-page/features';
import { Hero } from '@smart-editor/components/landing-page/hero';
import { TryEditor } from '@smart-editor/components/landing-page/try-editor';

const Page = async () => {
  return (
    <>
      <Hero />
      <Features />
      <TryEditor />
    </>
  );
};

export default Page;
