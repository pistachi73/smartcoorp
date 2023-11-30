'use client';

import { EPost } from '@prisma/client';
import { getMetadata } from '@smart-editor/actions/get-metadata';
import { usePostEditor } from '@smart-editor/hooks/use-post-editor/index';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { PostEditor, SkeletonPostEditor } from '@smartcoorp/ui/post-editor';

import { useGetPost } from '../posts.hooks';

import { Header } from './header/header';

export type SavingStatus = 'saving' | 'saved' | 'unsaved';

export const PostWriter = ({ post }: { post: EPost }) => {
  const [initialRender, setInitialRender] = useState(true);
  const session = useSession();
  const { postId } = useParams();
  const { data } = useGetPost({
    initialPost: post,
  });
  const [saving, setSaving] = useState<SavingStatus>('unsaved');

  const { blocksDB, dispatchBlocksDB } = usePostEditor({
    initialBlocksDb: data?.post?.content,
    postId: postId as string,
    userId: session?.data?.id ?? '',
    saving,
    setSaving,
    saveInterval: 2000,
  });

  useEffect(() => {
    setSaving('unsaved');
  }, [blocksDB, setSaving]);

  useEffect(() => {
    setInitialRender(false);
  }, []);

  return (
    <>
      <Header
        saving={saving}
        title={data?.post?.title}
        content={{
          blocks: blocksDB.blocks,
          chains: blocksDB.chains,
        }}
      />

      {initialRender ? (
        <SkeletonPostEditor />
      ) : (
        <PostEditor
          blocksDB={blocksDB}
          dispatchBlocksDB={dispatchBlocksDB}
          getMetaData={getMetadata}
          maxImages={5}
          toolbarTopOffset={60}
          withBorder={false}
        />
      )}
    </>
  );
};
