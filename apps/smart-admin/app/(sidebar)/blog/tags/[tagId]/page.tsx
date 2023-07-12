'use client';
import { EditEntryLayout } from '@smart-admin/components/layout';
import { useMemo } from 'react';

import { isNumber } from '@smartcoorp/smart-types';

type EditTagProps = {
  params: {
    tagId: string;
  };
};

const EditTag = ({ params }: EditTagProps) => {
  const tagId = useMemo(() => {
    if (isNumber(params.tagId)) {
      return parseInt(params.tagId as unknown as string);
    }
    return -1;
  }, [params.tagId]);

  return (
    <EditEntryLayout
      entryId={tagId}
      title="Blog Post Tags"
      status="loading"
      fetchStatus="idle"
    >
      Hello
    </EditEntryLayout>
  );
};

export default EditTag;
