import Usage from '@smart-editor/components/user-dashboard/usage';

import './code-snippets.css';
import { Breadcrumb, type BreadcrumbItem } from '@smartcoorp/ui/breadcrumb';
import { spaceXL } from '@smartcoorp/ui/tokens';

const UsagePage = async () => {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Usage',
      href: '/usage',
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
      <Usage />
    </>
  );
};

export default UsagePage;
