import { BlocksDB } from 'libs/ui/post-editor/src/contexts/blocks-context';
import { useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { isNumber } from '@smartcoorp/smart-types';
import { RouterOutputs, trpc } from '@smartcoorp/trpc';
import { PostEditor } from '@smartcoorp/ui/post-editor';

import { EditEntryLayout } from '../../components/layout/edit-entry.layout';
type UserData = RouterOutputs['user']['getUserById'];

const EditUser = () => {
  const router = useRouter();
  const blogPostId = useMemo(() => {
    if (isNumber(router.query.id)) {
      return parseInt(router.query.id as unknown as string);
    }
    return -1;
  }, [router.query.id]);

  const { mutateAsync: getMetaDataMutate } =
    trpc.metadata.getByUrl.useMutation();

  const [postBlocks, setPostBlocks] = useState<BlocksDB>({
    blocks: {
      '0': {
        id: '0',
        chainId: 'main',
        type: 'header',
        data: {
          level: 3,
          text: 'Write your blog',
        },
      },
    },
    chains: {
      main: ['0'],
    },
  });

  return (
    <EditEntryLayout title="Blog Post">
      <PostEditor
        blocksDB={postBlocks}
        setBlocksDB={setPostBlocks}
        getMetaData={getMetaDataMutate}
      />
    </EditEntryLayout>
  );
};

export default EditUser;
