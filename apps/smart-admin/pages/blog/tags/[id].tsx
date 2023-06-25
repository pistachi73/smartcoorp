import { useMemo } from 'react';

import { useRouter } from 'next/router';

import { isNumber } from '@smartcoorp/smart-types';

import { EditEntryLayout } from '../../../components/layout/edit-entry.layout';

const EditTag = () => {
  const router = useRouter();
  const tagId = useMemo(() => {
    if (isNumber(router.query.id)) {
      return parseInt(router.query.id as unknown as string);
    }
    return -1;
  }, [router.query.id]);

  return (
    <EditEntryLayout entryId={tagId} title="Blog Post Tags">
      Hello
    </EditEntryLayout>
  );
};

export default EditTag;
