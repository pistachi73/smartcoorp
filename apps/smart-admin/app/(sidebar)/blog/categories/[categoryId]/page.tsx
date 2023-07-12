'use client';

import { EditEntryLayout } from '@smart-admin/components/layout';
import { useMemo } from 'react';

import { isNumber } from '@smartcoorp/smart-types';

type EditCategoryProps = {
  params: {
    categoryId: string;
  };
};

const EditCategory = ({ params }: EditCategoryProps) => {
  const categoryId = useMemo(() => {
    if (isNumber(params.categoryId)) {
      return parseInt(params.categoryId as unknown as string);
    }
    return -1;
  }, [params.categoryId]);

  return (
    <EditEntryLayout
      entryId={categoryId}
      title="Blog Post Categorys"
      status="loading"
      fetchStatus="idle"
    >
      Hello
    </EditEntryLayout>
  );
};

export default EditCategory;
