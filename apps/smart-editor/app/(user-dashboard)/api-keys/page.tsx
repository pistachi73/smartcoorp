import {
  ApiKeys,
  apiKeysTableColumns,
} from '@smart-editor/components/user-dashboard/api-keys';
import { nextAuthConfig } from '@smart-editor/utils/next-auth-config';
import { getServerSession } from 'next-auth';
import { Suspense } from 'react';

import { redirect } from 'next/navigation';

import prisma from '@smartcoorp/prisma';
import { Table } from '@smartcoorp/ui/data-table';
import { Headline } from '@smartcoorp/ui/headline';
import { space3XL } from '@smartcoorp/ui/tokens';

const APIKeyPage = async () => {
  return (
    <>
      <Headline
        size="xlarge"
        style={{
          marginBottom: space3XL,
        }}
      >
        Api Keys
      </Headline>
      {/* <Suspense fallback={<Table columnDefs={apiKeysTableColumns} />}> */}
      {/* @ts-expect-error Server Component */}
      <ApiKeys />
      {/* </Suspense> */}
    </>
  );
};

export default APIKeyPage;
