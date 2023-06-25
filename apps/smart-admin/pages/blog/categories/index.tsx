import type { NextPage } from 'next';

import { Body } from '@smartcoorp/ui/body';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceXS, spaceXXL } from '@smartcoorp/ui/tokens';

import { requireAuth } from '../../../server/common/require-auth';
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const BlogPostCategories: NextPage = () => {
  return (
    <>
      <Headline
        as="h1"
        size="xxxlarge"
        noMargin
        style={{ marginBottom: spaceXS }}
      >
        Blog Posts Categories
      </Headline>
      <Body variant="neutral" size="small" style={{ marginBottom: spaceXXL }}>
        View and Manage smartcoorp blog posts categories.
      </Body>
    </>
  );
};

export default BlogPostCategories;
