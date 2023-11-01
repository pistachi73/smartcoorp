import { JSONRendering } from '@smart-editor/components/user-dashboard/json-rendering';

import './code-snippets.css';
import { Breadcrumb, type BreadcrumbItem } from '@smartcoorp/ui/breadcrumb';
import { spaceXL } from '@smartcoorp/ui/tokens';

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
