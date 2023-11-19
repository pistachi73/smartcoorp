'use client';

import {
  FormContainer,
  SkeletonFormField,
} from '@smart-editor/components/shared/styled-form-field';

import { useGetPost } from '../posts.hooks';

import {
  CoverImageField,
  DeletePostField,
  EditPostLink,
  ProseField,
  StatusField,
} from './fields';

export const PostSettings = () => {
  const { data, isLoading } = useGetPost();

  return isLoading ? (
    <SkeletonFormField />
  ) : (
    <FormContainer>
      <EditPostLink />
      <ProseField
        title={data?.post?.title ?? ''}
        description={data?.post?.description ?? ''}
      />
      <StatusField status={data?.post?.status ?? 'DRAFT'} />
      <CoverImageField coverImageUrl={data?.post?.coverImageUrl ?? ''} />
      <DeletePostField />
    </FormContainer>
  );
};
