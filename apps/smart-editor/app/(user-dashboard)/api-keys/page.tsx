import {
  ApiKeys,
  apiKeysTableColumns,
} from '@smart-editor/components/user-dashboard/api-keys';
import { Suspense } from 'react';

import { Breadcrumb, BreadcrumbItem } from '@smartcoorp/ui/breadcrumb';
import { Table } from '@smartcoorp/ui/data-table';
import { Headline } from '@smartcoorp/ui/headline';
import { space3XL, spaceXL } from '@smartcoorp/ui/tokens';

const APIKeyPage = async () => {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'Api Keys',
      href: '/api-keys',
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
      <Headline
        size="xlarge"
        style={{
          marginBottom: space3XL,
        }}
      >
        Api Keys
      </Headline>
      <Suspense fallback={<Table columnDefs={apiKeysTableColumns} />}>
        <ApiKeys />
      </Suspense>
    </>
  );
};

export default APIKeyPage;
