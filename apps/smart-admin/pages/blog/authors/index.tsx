import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import type { NextPage } from 'next';
import styled from 'styled-components';

import { RouterOutputs, trpc } from '@smartcoorp/trpc';
import { Body } from '@smartcoorp/ui/body';
import { Table } from '@smartcoorp/ui/data-table';
import { DotLoading } from '@smartcoorp/ui/dot-loading';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceXS, spaceXXL } from '@smartcoorp/ui/tokens';

import { requireAuth } from '../../../server/common/require-auth';

const ClampedBody = styled(Body)`
  max-width: 250px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const BlogPostAuthors: NextPage = () => {
  const utils = trpc.useContext();
  const blogPostAuthors = trpc.blogPostAuthors.getAll.useQuery();
  const deleteBlogPostAuthors = trpc.blogPostAuthors.deleteMany.useMutation({
    onSuccess: () => {
      utils.blogPostAuthors.getAll.invalidate();
    },
  });

  const tableColumns: ColumnDef<
    RouterOutputs['blogPostAuthors']['getAll'][0]
  >[] = [
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
      accessorKey: 'name',
      cell: (info) => info.getValue(),
      header: 'NAME',
    },
    {
      accessorKey: 'website',
      cell: (info) => info.getValue(),
      header: 'WEBSITE',
    },
    {
      accessorKey: 'bio',
      cell: (info) => (
        <ClampedBody noMargin>
          {info.getValue() as unknown as string}
        </ClampedBody>
      ),
      header: 'BIO',
      enableSorting: false,
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
        Blog Posts Auhtors
      </Headline>
      <Body variant="neutral" size="small" style={{ marginBottom: spaceXXL }}>
        View and Manage smartcoorp blog posts authors.
      </Body>
      {blogPostAuthors.data ? (
        <Table
          data={blogPostAuthors.data}
          columnDefs={tableColumns}
          createUrl="/blog/authors/new"
          onRowsDelete={(rows) => {
            deleteBlogPostAuthors.mutate({ ids: rows.map((row) => row.id) });
          }}
          defaultColumnVisibility={{
            updatedAt: false,
          }}
          editUrl="/blog/authors"
        />
      ) : (
        <DotLoading />
      )}
    </>
  );
};

export default BlogPostAuthors;
