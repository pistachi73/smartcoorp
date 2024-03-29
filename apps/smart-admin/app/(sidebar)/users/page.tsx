'use client';

import { clientTRPC } from '@smart-admin/trpc';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useState } from 'react';
import styled from 'styled-components';

import { RouterOutputs } from '@smartcoorp/smart-api';
import { Body } from '@smartcoorp/ui/body';
import { Table } from '@smartcoorp/ui/data-table';
import {
  blue100,
  blue500,
  borderRadiusXS,
  primary,
  primary100,
  scale150,
  scale210,
  spaceL,
  spaceXS,
} from '@smartcoorp/ui/tokens';

const RoleBadge = styled(Body)<{ role: 'ADMIN' | 'BASIC' }>`
  padding: ${spaceXS} ${spaceL};
  border-radius: ${borderRadiusXS};
  background-color: ${({ role }) => (role === 'ADMIN' ? primary100 : blue100)};
  color: ${({ role }) => (role === 'ADMIN' ? primary : blue500)};
  border: 1px solid ${({ role }) => (role === 'ADMIN' ? primary : blue500)};
  text-align: center;
  max-width: ${scale210};
`;

const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${scale150};
  height: ${scale150};
`;
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

type User = RouterOutputs['user']['getAllUsers'][0];

const Users = () => {
  const users = clientTRPC.user.getAllUsers.useQuery();

  const utils = clientTRPC.useContext();
  const deleteUsers = clientTRPC.user.deleteUsers.useMutation({
    onSuccess: () => {
      utils.user.getAllUsers.invalidate();
    },
  });

  const tableColumns: ColumnDef<User>[] = [
    {
      accessorKey: 'profileImageUrl',
      header: 'IMAGE',
      enableColumnFilter: false,
      enableSorting: false,
      cell: (imageUrl) => {
        const info = imageUrl.getValue();
        return (
          <ProfileImageContainer>
            {info ? (
              <ProfileImage
                src={`${info as string}?${new Date().getTime()}`}
                alt="User profile Image"
              />
            ) : (
              <ProfileImage src={'avatar.png'} alt="Default profile image" />
            )}
          </ProfileImageContainer>
        );
      },
    },
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
      data={users.data}
      columnDefs={tableColumns}
      createUrl="/users/new"
      onRowsDelete={(rows) => {
        deleteUsers.mutate({ ids: rows.map((row) => row.id) });
      }}
      editUrl="/users"
    />
  );
};

export default Users;
