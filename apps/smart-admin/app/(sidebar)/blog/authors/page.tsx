'use client';

import { clientTRPC } from '@smart-admin/trpc';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import type { NextPage } from 'next';
import styled from 'styled-components';

import { RouterOutputs } from '@smartcoorp/smart-api';
import { Body } from '@smartcoorp/ui/body';
import { Table } from '@smartcoorp/ui/data-table';

const ClampedBody = styled(Body)`
  max-width: 250px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
export type PostAuthor = RouterOutputs['blogPostAuthors']['getAll'][0];

const BlogPostAuthors: NextPage = () => {
  const utils = clientTRPC.useContext();
  const blogPostAuthors = clientTRPC.blogPostAuthors.getAll.useQuery();
  const deleteBlogPostAuthors =
    clientTRPC.blogPostAuthors.deleteMany.useMutation({
      onSuccess: () => {
        utils.blogPostAuthors.getAll.invalidate();
      },
    });

  const tableColumns: ColumnDef<PostAuthor>[] = [
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
      cell: (info) => format(new Date(info.getValue() as string), 'PPP'),
      filterFn: 'dateBetween',
    },
    {
      accessorKey: 'updatedAt',
      header: 'UPDATED AT',
      cell: (info) => format(new Date(info.getValue() as string), 'PPP'),
      filterFn: 'dateBetween',
    },
  ];

  return (
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
  );
};

export default BlogPostAuthors;
