import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { AnimatePresence } from 'framer-motion';
import React, { useMemo } from 'react';
import { BiLayerPlus, BiSortDown, BiSortUp } from 'react-icons/bi';

import { Checkbox } from '../checkbox';

import { ColumnToggler, Filter } from './components';
import { ColumnFilters } from './components/filter/column-filters';
import { dateBetweenFilterFn } from './components/filter/date-filter';
import { GlobalFilter, globalFilterFn } from './components/global-filter';
import { Pagination } from './components/pagination/pagination';
import { SelectedRows } from './components/selected-rows';
import { Styled as S } from './table.styles';
import { TableProps } from './table.types';

declare module '@tanstack/table-core' {
  interface FilterFns {
    dateBetween: FilterFn<unknown>;
  }
}

export const Table = <T,>({
  data,
  columnDefs,
  createUrl,
  enableMultiSort = true,
  enableSelect = true,
  defaultColumnVisibility = {},
}: TableProps<T>) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columnsWithSelect = useMemo<ColumnDef<T>[]>(() => {
    if (!enableSelect) {
      return columnDefs;
    }
    columnDefs.unshift({
      id: 'select',
      width: '30px',
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

    return columnDefs;
  }, [columnDefs, enableSelect]);

  const withMultipleSelectEnabledColumns = useMemo<ColumnDef<T>[]>(() => {
    if (!enableMultiSort) {
      return columnsWithSelect;
    }
    return columnsWithSelect.map((column) => {
      if (column.id === 'select') {
        return column;
      }

      return {
        ...column,
        enableMultiSort: true,
      };
    });
  }, [columnsWithSelect, enableMultiSort]);

  const table = useReactTable({
    data,
    columns: withMultipleSelectEnabledColumns,
    filterFns: {
      dateBetween: dateBetweenFilterFn,
    },
    initialState: {
      columnVisibility: defaultColumnVisibility,
    },
    state: {
      columnFilters,
      rowSelection,
      globalFilter,
      sorting,
    },

    /** SORTING OPTIONS */
    getSortedRowModel: getSortedRowModel(),
    enableMultiSort: true,
    onSortingChange: setSorting,

    /** PAGINATION OPTIONS */
    getPaginationRowModel: getPaginationRowModel(),
    // onPaginationChange: setPagination,
    autoResetPageIndex: true,
    // pageCount: data.length / pagination.pageSize,

    /** COLUMN SPECIFIC FILTER OPTIONS */
    onColumnFiltersChange: setColumnFilters,

    /** GLOBAL FILTER OPTIONS */
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,

    /** ROW SELECTION OPTIONS */
    enableRowSelection: true,

    /** REST OPTIONS */
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <S.TableContainer>
      <S.TableActionsContainer>
        <ColumnFilters
          filters={columnFilters}
          setColumnFilters={table.setColumnFilters}
        />

        <S.RightTableActionsContainer>
          <GlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
          <ColumnToggler table={table} />
          {createUrl && (
            <S.StyledButton
              size="small"
              icon={BiLayerPlus}
              variant="primary"
              href={createUrl}
            >
              New
            </S.StyledButton>
          )}
        </S.RightTableActionsContainer>
      </S.TableActionsContainer>
      <S.Table>
        <S.TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <S.TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <S.TableHeader
                    key={header.id}
                    $width={header.column.columnDef.width}
                  >
                    {header.isPlaceholder ? null : (
                      <S.TableHeaderWrapper
                        $sortingEnabled={header.column.getCanSort()}
                      >
                        <S.TableHeaderText
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <div
                            style={{
                              position: 'relative',
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <AnimatePresence>
                                <S.TableHeaderSortIcon
                                  key={header.column.getIsSorted() as string}
                                  initial={{
                                    y:
                                      header.column.getIsSorted() === 'asc'
                                        ? '5%'
                                        : '-105%',
                                    opacity: 0,
                                  }}
                                  animate={{ y: '-50%', opacity: 1 }}
                                  exit={{
                                    y:
                                      header.column.getIsSorted() === 'asc'
                                        ? '5%'
                                        : '-105%',
                                    opacity: 0,
                                    transition: {
                                      duration: 0.1,
                                    },
                                  }}
                                  transition={{
                                    duration: 0.2,
                                    ease: 'easeInOut',
                                  }}
                                >
                                  {{
                                    asc: <BiSortUp size={18} />,
                                    desc: <BiSortDown size={18} />,
                                  }[header.column.getIsSorted() as string] ??
                                    null}
                                </S.TableHeaderSortIcon>
                              </AnimatePresence>
                            )}
                          </div>
                        </S.TableHeaderText>

                        {header.column.getCanFilter() ? (
                          <Filter column={header.column} table={table} />
                        ) : null}
                      </S.TableHeaderWrapper>
                    )}
                  </S.TableHeader>
                );
              })}
            </S.TableRow>
          ))}
        </S.TableHead>
        <S.TableBody>
          {table.getRowModel().rows.length === 0 ? (
            <S.TableRow>
              <S.TableCell
                key={'no_results'}
                colSpan={table.getAllColumns().length}
                $uniqueCell
              >
                No results
              </S.TableCell>
            </S.TableRow>
          ) : (
            table.getRowModel().rows.map((row) => {
              return (
                <S.TableRow key={row.id} $selected={row.getIsSelected()}>
                  {row.getVisibleCells().map((cell) => (
                    <S.TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </S.TableCell>
                  ))}
                </S.TableRow>
              );
            })
          )}
        </S.TableBody>
      </S.Table>
      <S.FooterContainer>
        <SelectedRows
          numberOfSelectedRows={table.getFilteredSelectedRowModel().rows.length}
          numberOfTotalRows={table.getFilteredRowModel().rows.length}
        />
        <Pagination table={table} />
      </S.FooterContainer>
    </S.TableContainer>
  );
};
