import { Meta, StoryFn } from '@storybook/react';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useState } from 'react';

import { Person, makeData } from './helpers';
import { Table } from './table';
import { TableProps } from './table.types';

export default {
  title: 'Component/Table',
  description: 'Table component for SC projects',
  component: Table,

  parameters: {
    maxWidth: true,
    docs: {
      description: {
        component:
          'The Table component is a versatile and customizable UI element designed for displaying tabular data in React applications. It provides a structured and organized way to present data in rows and columns, with features such as column headers, sorting, pagination, filtering, and customization options. Simply pass the data as props and configure the desired functionalities to easily incorporate interactive and visually appealing tables into your application.',
      },
    },
  },
  argTypes: {
    theme: { table: { disable: true } },
    as: { table: { disable: true } },
    forwardedAs: { table: { disable: true } },
    innerRef: { table: { disable: true } },
  },
} as Meta<TableProps<{ a: string }>>;

const Template: StoryFn<TableProps<Person>> = (args: TableProps<Person>) => {
  const { enableMultiSort, enableSelect, createUrl } = args;
  const [data] = useState<Person[]>(makeData(100));

  const columns: ColumnDef<Person>[] = [
    {
      accessorKey: 'firstName',
      cell: (info) => info.getValue(),
      header: 'FIRST NAME',
    },
    {
      accessorFn: (row) => row.lastName,
      id: 'lastName',
      cell: (info) => info.getValue(),
      header: 'LAST NAME',
    },
    {
      accessorKey: 'age',
      header: 'AGE',
    },
    {
      accessorKey: 'visits',
      header: 'VISITS',
    },
    {
      accessorKey: 'status',
      header: 'STATUS',
    },
    {
      accessorKey: 'progress',
      header: 'PROFILE PROGRESS',
    },
    {
      accessorKey: 'createdAt',
      header: 'CREATED AT',
      cell: (info) => format(info.getValue() as Date, 'PPP'),
      filterFn: 'dateBetween',
    },
  ];

  return (
    <Table
      data={data}
      columnDefs={columns}
      createUrl={createUrl}
      enableMultiSort={enableMultiSort}
      enableSelect={enableSelect}
      defaultColumnVisibility={{
        lastName: false,
        visits: false,
        progress: false,
      }}
    />
  );
};

export const Default = {
  render: Template,
  args: {},
};

export const WithCreateUrl = {
  render: Template,
  args: {
    createUrl: 'test',
  },
};

export const WithoutRowSelection = {
  render: Template,
  args: {
    enableSelect: false,
  },
};

export const WithoutMultiSort = {
  render: Template,
  args: {
    enableMultiSort: false,
  },
};
