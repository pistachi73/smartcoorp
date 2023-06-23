// @/src/pages/dashboard/index.tsx
import type { NextPage } from 'next';

import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceXS, spaceXXL } from '@smartcoorp/ui/tokens';

import { requireAuth } from '../../server/common/require-auth';
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const BlogPosts: NextPage = () => {
  return (
    <>
      <Headline
        as="h1"
        size="xxxlarge"
        noMargin
        style={{ marginBottom: spaceXS }}
      >
        Blog Posts
      </Headline>
      <Body variant="neutral" size="small" style={{ marginBottom: spaceXXL }}>
        View and Manage smartcoorp blog posts.
      </Body>
      <Button to="/blog-post/new">New Blog Post</Button>
    </>
  );
};

export default BlogPosts;
