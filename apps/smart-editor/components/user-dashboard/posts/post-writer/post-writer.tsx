'use client';

import { useState } from 'react';

import { SkeletonPostEditor } from '@smartcoorp/ui/post-editor';
import { spaceL } from '@smartcoorp/ui/tokens';

import { useGetPost } from '../posts.hooks';

import { Editor } from './editor';
import { Header } from './header/header';

export type SavingStatus = 'saving' | 'saved' | 'unsaved';

export const PostWriter = () => {
  const [saving, setSaving] = useState<SavingStatus>('unsaved');
  const { data } = useGetPost();

  return (
    <>
      <Header
        saving={saving}
        title={data?.post?.title}
        content={data?.post?.content}
      />

      {data?.post?.content ? (
        <Editor
          initialData={data.post.content}
          setSaving={setSaving}
          saving={saving}
        />
      ) : (
        <SkeletonPostEditor />
      )}
    </>
  );
};
