import { Features } from '@smart-editor/components/landing-page/features';
import { Hero } from '@smart-editor/components/landing-page/hero';
import { Pricing } from '@smart-editor/components/landing-page/pricing';
import { Metadata } from 'next';

import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'SmartEditor - Transition from words to JSON-powered content.',
  description:
    "SmartEditor is a powerful tool that allows you to effortlessly write and organize content, and then export it as JSON. Enhance your content creation process with SmartEditor's user-friendly interface and robust export capabilities.",
};

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
