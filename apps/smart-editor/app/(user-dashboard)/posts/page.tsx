import {
  Posts,
  SkeletonPosts,
} from '@smart-editor/components/user-dashboard/posts';
import { Suspense } from 'react';

import { Headline } from '@smartcoorp/ui/headline';
import { space3XL } from '@smartcoorp/ui/tokens';

const PostsPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  console.log({ searchParams });
  return (
    <>
      <Headline
        size="xlarge"
        style={{
          marginBottom: space3XL,
        }}
      >
        Overview
      </Headline>
      <Suspense fallback={<SkeletonPosts />}>
        <Posts titleSearchParam={searchParams.title} />
      </Suspense>
    </>
  );
};

export default PostsPage;
