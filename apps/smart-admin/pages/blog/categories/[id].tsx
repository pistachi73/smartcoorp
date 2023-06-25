import { useMemo } from 'react';

import { useRouter } from 'next/router';

import { isNumber } from '@smartcoorp/smart-types';

import { EditEntryLayout } from '../../../components/layout/edit-entry.layout';

const EditCategory = () => {
  const router = useRouter();
  const categoryId = useMemo(() => {
    if (isNumber(router.query.id)) {
      return parseInt(router.query.id as unknown as string);
    }
    return -1;
  }, [router.query.id]);

  return (
    <EditEntryLayout entryId={categoryId} title="Blog Post Categorys">
      Hello
    </EditEntryLayout>
  );
};

export default EditCategory;
