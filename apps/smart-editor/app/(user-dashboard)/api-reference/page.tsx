import ApiReference from '@smart-editor/components/user-dashboard/api-reference';

import './code-snippets.css';
import { Breadcrumb, type BreadcrumbItem } from '@smartcoorp/ui/breadcrumb';
import { spaceXL } from '@smartcoorp/ui/tokens';

const ApiReferencePage = async () => {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'API Reference',
      href: '/api-reference',
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
      <ApiReference />
    </>
  );
};

export default ApiReferencePage;
