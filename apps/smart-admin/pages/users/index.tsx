// @/src/pages/dashboard/index.tsx
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import type { NextPage } from 'next';

import { RouterOutputs, trpc } from '@smartcoorp/trpc';
import { Body } from '@smartcoorp/ui/body';
import { Table } from '@smartcoorp/ui/data-table';
import { Headline } from '@smartcoorp/ui/headline';
import { spaceXS } from '@smartcoorp/ui/tokens';

import { requireAuth } from '../../server/common/require-auth';
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Users: NextPage = () => {
  const utils = trpc.useContext();
  const users = trpc.user.getAllUsers.useQuery();
  const deleteUsers = trpc.user.deleteUsers.useMutation({
    onSuccess: () => {
      utils.user.getAllUsers.invalidate();
    },
  });
  if (users.status !== 'success') {
    // won't happen since the query has been prefetched
    return <>Loading...</>;
  }

  const tableColumns: ColumnDef<RouterOutputs['user']['getAllUsers'][0]>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: (info) => (
        <Body variant="neutral" size="small">
          {info.getValue() as string}
        </Body>
      ),
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      accessorKey: 'username',
      cell: (info) => info.getValue(),
      header: 'USERNAME',
    },
    {
      accessorKey: 'email',
      cell: (info) => info.getValue(),
      header: 'EMAIL',
    },
    {
      accessorKey: 'role',
      cell: (info) => {
        const val = info.getValue();
        return val === 'ADMIN' ? (
          <Body noMargin>{val}</Body>
        ) : (
          <Body noMargin>Noob</Body>
        );
      },
      header: 'ROLE',
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

  const { data } = users;
  return (
    <>
      <Headline
        as="h1"
        size="xxxlarge"
        noMargin
        style={{ marginBottom: spaceXS }}
      >
        Smartcoorp Users
      </Headline>
      <Body variant="neutral" size="small">
        View and Manage smartcoorp users.
      </Body>
      <Table
        data={data}
        columnDefs={tableColumns}
        createUrl="/users/new"
        onRowsDelete={(rows) => {
          deleteUsers.mutate({ ids: rows.map((row) => row.id) });
        }}
        editUrl="/users"
      />
    </>
  );
};

export default Users;
