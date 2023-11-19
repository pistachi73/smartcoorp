import { getMetadata } from '@smart-editor/actions/get-metadata';
import { usePostEditor } from '@smart-editor/hooks/use-post-editor/use-post-editor';
import { useSession } from 'next-auth/react';
import { memo, useEffect } from 'react';

import { useParams } from 'next/navigation';

import { PostEditor } from '@smartcoorp/ui/post-editor';

import { SavingStatus } from './post-writer';

type EditorProps = {
  initialData: any;
  saving: SavingStatus;
  setSaving: (saving: SavingStatus) => void;
};
// eslint-disable-next-line react/display-name
export const Editor = memo(
  ({ initialData, setSaving, saving }: EditorProps) => {
    const session = useSession();
    const { postId } = useParams();

    const { blocksDB, dispatchBlocksDB } = usePostEditor({
      initialBlocksDb: initialData,
      postId: postId,
      userId: session?.data?.id ?? '',
      saving,
      setSaving,
    });

    useEffect(() => {
      setSaving('unsaved');
    }, [blocksDB, setSaving]);

    return (
      <PostEditor
        blocksDB={blocksDB}
        dispatchBlocksDB={dispatchBlocksDB}
        getMetaData={getMetadata}
        maxImages={5}
        toolbarTopOffset={60}
      />
    );
  }
);
