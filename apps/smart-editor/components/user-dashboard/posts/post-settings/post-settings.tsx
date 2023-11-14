'use client';

import { FormContainer } from '@smart-editor/components/shared/styled-form-field';

import { SkeletonFormField } from '../../account/account-form-fields/skeleton-form-field';
import { useGetPost } from '../posts.hooks';

import { CoverImageField } from './fields/cover-image-field';
import { DeletePostField } from './fields/delete-post-field';
import { EditPostLink } from './fields/edit-post-link';
import { ProseField } from './fields/prose-field';
import { StatusField } from './fields/status-field';

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
      <DeletePostField coverImageUrl={data?.post?.coverImageUrl ?? ''} />
    </FormContainer>
  );
};
