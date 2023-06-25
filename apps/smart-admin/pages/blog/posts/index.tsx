import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import type { NextPage } from 'next';
import styled from 'styled-components';

import { RouterOutputs, trpc } from '@smartcoorp/trpc';
import { Body } from '@smartcoorp/ui/body';
import { Button } from '@smartcoorp/ui/button';
import { Table } from '@smartcoorp/ui/data-table';
import { DotLoading } from '@smartcoorp/ui/dot-loading';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceXS, spaceXXL } from '@smartcoorp/ui/tokens';

import { requireAuth } from '../../../server/common/require-auth';
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const ClampedBody = styled(Body)`
  max-width: 250px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const BlogPosts: NextPage = () => {
  const utils = trpc.useContext();
  const blogPosts = trpc.blogPost.getAll.useQuery();
  const deleteBlogPosts = trpc.blogPost.deleteMany.useMutation({
    onSuccess: () => {
      utils.blogPost.getAll.invalidate();
    },
  });

  const tableColumns: ColumnDef<RouterOutputs['blogPost']['getAll'][0]>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: (info) => (
        <Body variant="neutral" size="small" noMargin>
          {info.getValue() as string}
        </Body>
      ),
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: 'title',
      cell: (info) => info.getValue(),
      header: 'TITLE',
    },
    {
      accessorKey: 'description',
      cell: (info) => (
        <ClampedBody noMargin>
          {info.getValue() as unknown as string}
        </ClampedBody>
      ),
      header: 'DESCRIPTION',
    },
    {
      accessorKey: 'readTime',
      cell: (info) => `${info.getValue()} min`,
      header: 'READING TIME',
    },
    {
      accessorKey: 'published',
      cell: (info) => (info.getValue() ? 'Published' : 'Not Published'),
      header: 'PUBLISHED',
      enableColumnFilter: false,
    },
    {
      accessorKey: 'authorId',
      cell: (info) => (
        <Button
          variant="secondary"
          size="small"
          to={`/blog/authors/${info.getValue()}`}
        >
          {info.getValue() as unknown as number}
        </Button>
      ),
      header: 'AUHTOR ID',
      enableColumnFilter: false,
    },

    {
      accessorKey: 'createdAt',
      header: 'CREATED AT',
      cell: (info) => format(info.getValue() as Date, 'PPP'),
      filterFn: 'dateBetween',
    },
    {
      accessorKey: 'updatedAt',
      header: 'UPDATED AT',
      cell: (info) => format(info.getValue() as Date, 'PPP'),
      filterFn: 'dateBetween',
    },
  ];

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
      {blogPosts.data ? (
        <Table
          data={blogPosts.data}
          columnDefs={tableColumns}
          createUrl="/blog/authors/new"
          onRowsDelete={(rows) => {
            deleteBlogPosts.mutate({ ids: rows.map((row) => row.id) });
          }}
          defaultColumnVisibility={{
            updatedAt: false,
            readTime: false,
            published: false,
          }}
          editUrl="/blog/posts"
        />
      ) : (
        <DotLoading />
      )}
    </>
  );
};

export default BlogPosts;
