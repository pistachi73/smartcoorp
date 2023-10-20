import {
  ApiKeys,
  apiKeysTableColumns,
} from '@smart-editor/components/user-dashboard/api-keys';
import { Suspense } from 'react';

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
      <Suspense fallback={<Table columnDefs={apiKeysTableColumns} />}>
        <ApiKeys />
      </Suspense>
    </>
  );
};

export default APIKeyPage;
