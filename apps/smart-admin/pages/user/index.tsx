// @/src/pages/dashboard/index.tsx
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import type { NextPage } from 'next';
import styled from 'styled-components';

import { RouterOutputs, trpc } from '@smartcoorp/trpc';
import { Body } from '@smartcoorp/ui/body';
import { Table } from '@smartcoorp/ui/data-table';
import { Headline } from '@smartcoorp/ui/headline';
import {
  blue100,
  blue500,
  borderRadiusXS,
  primary,
  primary100,
  scale210,
  space3XL,
  spaceL,
  spaceXS,
  spaceXXL,
} from '@smartcoorp/ui/tokens';

import { requireAuth } from '../../server/common/require-auth';
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const RoleBadge = styled(Body)<{ role: 'ADMIN' | 'BASIC' }>`
  padding: ${spaceXS} ${spaceL};
  border-radius: ${borderRadiusXS};
  background-color: ${({ role }) => (role === 'ADMIN' ? primary100 : blue100)};
  color: ${({ role }) => (role === 'ADMIN' ? primary : blue500)};
  border: 1px solid ${({ role }) => (role === 'ADMIN' ? primary : blue500)};

  text-align: center;
  max-width: ${scale210};
`;
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
        <Body variant="neutral" size="small" noMargin>
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
        const val = info.getValue() as string;
        return val === 'ADMIN' ? (
          <RoleBadge role="ADMIN" size="xsmall" noMargin>
            {val}
          </RoleBadge>
        ) : (
          <RoleBadge role="BASIC" size="xsmall" noMargin>
            {val}
          </RoleBadge>
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
      <Body variant="neutral" size="small" style={{ marginBottom: spaceXXL }}>
        View and Manage smartcoorp users.
      </Body>
      <Table
        data={data}
        columnDefs={tableColumns}
        createUrl="/user/new"
        onRowsDelete={(rows) => {
          deleteUsers.mutate({ ids: rows.map((row) => row.id) });
        }}
        editUrl="/user"
      />
    </>
  );
};

export default Users;
