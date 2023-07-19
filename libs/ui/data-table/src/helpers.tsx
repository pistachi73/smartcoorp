import { faker } from '@faker-js/faker';
import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@smartcoorp/ui/checkbox';

export const fromCamelCaseToNormalCase = (str: string) =>
  capitalizeFirstLetter(str.replace(/([a-z])([A-Z])/g, '$1 $2'));

const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: 'relationship' | 'complicated' | 'single';
  createdAt: Date;
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(40),
    visits: faker.datatype.number(1000),
    progress: faker.datatype.number(100),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single',
    ])[0],
    createdAt: faker.date.past(10),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
      };
    });
  };

  return makeDataLevel();
}

export const addOptionalColumns = <T,>(
  columns: ColumnDef<T>[],
  enableSelect: boolean,
  enableMultiSort: boolean
) => {
  let newCols = columns;
  if (enableSelect) {
    newCols.unshift({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          intermediate={table.getIsSomePageRowsSelected()}
          onChange={(v) => table.toggleAllPageRowsSelected(v)}
          size="small"
        />
      ),

      cell: ({ row }) => (
        <Checkbox
          size="small"
          checked={row.getIsSelected()}
          isDisabled={!row.getCanSelect()}
          onChange={(v) => row.toggleSelected(v)}
        />
      ),
    });
  }

  if (enableMultiSort) {
    newCols = newCols.map((column) => {
      if (column.id === 'select') {
        return column;
      }

      return {
        ...column,
        enableMultiSort: true,
      };
    });
  }

  return newCols;
};
