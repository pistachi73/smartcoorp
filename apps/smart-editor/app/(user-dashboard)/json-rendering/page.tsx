import { JSONRendering } from '@smart-editor/components/user-dashboard/json-rendering';
import './code-snippets.css';
import { type Metadata } from 'next';

import { Breadcrumb, type BreadcrumbItem } from '@smartcoorp/ui/breadcrumb';
import { spaceXL } from '@smartcoorp/ui/tokens';

export const metadata: Metadata = {
  title: 'Rendering SmartEditor JSON content in teact - A comprehensive guide',
  description:
    "Unlock the power of dynamic content with our comprehensive guide on rendering SmartEditor's JSON content in React. Learn step-by-step how to seamlessly integrate and display your JSON data in React components.",
};

const Page = async () => {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'JSON Rendering',
      href: '/json-rendering',
    },
  ];

  return (
    <>
      <Breadcrumb
        homeUrl="/posts"
        breadcrumbs={breadcrumbs}
        style={{
          marginBottom: spaceXL,
        }}
      />
      <JSONRendering />
    </>
  );
};

export default Page;
