'use client';
import { EApiKey } from '@prisma/client';
import { getApiKeys } from '@smart-editor/actions/api-keys.actions';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useState } from 'react';

import { Body } from '@smartcoorp/ui/body';
import { Table, selectColumn } from '@smartcoorp/ui/data-table';

import { ApiKeyTokenCell } from './api-keys.styles';
import { CreateApiKeyDialog } from './create-api-key-dialog/create-api-key-dialog';
import { DeleteApiKeyDialog } from './delete-api-key-dialog/delete-api-key-dialog';

export const apiKeysTableColumns: ColumnDef<EApiKey>[] = [
  selectColumn,
  {
    accessorKey: 'name',
    header: 'NAME',
    cell: (info) => (
      <Body size="small" noMargin>
        {info.getValue() as string}
      </Body>
    ),
  },
  {
    accessorKey: 'key',
    header: 'TOKEN',
    cell: (info) => (
      <ApiKeyTokenCell variant="neutral" size="small" noMargin>
        {(info.getValue() as string).substring(0, 10)}...
      </ApiKeyTokenCell>
    ),
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: 'lastUsed',
    header: 'CREATED AT',

    cell: (info) => (
      <Body size="small" noMargin>
        {info.getValue() === null
          ? 'Never Used'
          : format(new Date(info.getValue() as string), 'PPP')}
      </Body>
    ),
    filterFn: 'dateBetween',
  },
  {
    accessorKey: 'createdAt',
    header: 'CREATED AT',
    cell: (info) => (
      <Body size="small" noMargin>
        {format(new Date(info.getValue() as string), 'PPP')}
      </Body>
    ),
    filterFn: 'dateBetween',
  },
];

export const ApiKeys = ({ userId }: { userId: string }) => {
  const [isCreateApiKeyDialogOpen, setIsCreateApiKeyDialogOpen] =
    useState(false);

  const [isDeleteApiKeyDialogOpen, setIsDeleteApiKeyDialogOpen] =
    useState(false);

  const [toDeleteApiKeys, setToDeleteApiKeys] = useState<EApiKey[]>([]);

  const { data } = useQuery({
    queryKey: ['getApiKeys'],
    queryFn: () => getApiKeys({ userId }),
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Table
        data={data?.apiKeys}
        columnDefs={apiKeysTableColumns}
        onCreate={() => {
          setIsCreateApiKeyDialogOpen(true);
        }}
        onRowsDelete={(rows) => {
          setToDeleteApiKeys(rows);
          setIsDeleteApiKeyDialogOpen(true);
        }}
      />
      <CreateApiKeyDialog
        isOpen={isCreateApiKeyDialogOpen}
        setIsOpen={setIsCreateApiKeyDialogOpen}
        userId={userId}
      />
      <DeleteApiKeyDialog
        isOpen={isDeleteApiKeyDialogOpen}
        setIsOpen={setIsDeleteApiKeyDialogOpen}
        toDeleteApiKeys={toDeleteApiKeys}
      />
    </>
  );
};
