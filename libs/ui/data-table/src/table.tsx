'use client';

import {
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
import React from 'react';
import { BiLayerPlus, BiSortDown, BiSortUp } from 'react-icons/bi';

import { Skeleton } from '@smartcoorp/ui/skeleton';

import { ColumnToggler, Filter } from './components';
import { ColumnFilters } from './components/filter/column-filters';
import { dateBetweenFilterFn } from './components/filter/date-filter';
import { GlobalFilter, globalFilterFn } from './components/global-filter';
import { Pagination } from './components/pagination/pagination';
import { SelectedRowsWidget } from './components/selected-rows-widget';
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
  onCreate,
  enableMultiSort = true,
  enableSelect = true,
  defaultColumnVisibility = {},
  editUrl,
  onRowsDelete,
}: TableProps<T>) => {
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data: data || [],
    columns: columnDefs,
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
    enableMultiSort,
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
            disabled={data?.length === 0}
          />
          <ColumnToggler table={table} />
          {(createUrl || onCreate) && (
            <S.StyledButton
              size="small"
              icon={BiLayerPlus}
              variant="primary"
              {...(createUrl ? { to: createUrl } : {})}
              {...(onCreate ? { onClick: onCreate } : {})}
              disabled={Boolean(!data)}
            >
              New
            </S.StyledButton>
          )}
        </S.RightTableActionsContainer>
      </S.TableActionsContainer>
      <S.Table $disabled={data?.length === 0}>
        <S.TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <S.TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <S.TableHeader
                    key={header.id}
                    style={{
                      ...(header.id === 'select' ? { width: '50px' } : {}),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <S.TableHeaderWrapper
                        $sortingEnabled={header.column.getCanSort()}
                      >
                        {data ? (
                          <>
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
                                      key={
                                        header.column.getIsSorted() as string
                                      }
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
                                      }[
                                        header.column.getIsSorted() as string
                                      ] ?? null}
                                    </S.TableHeaderSortIcon>
                                  </AnimatePresence>
                                )}
                              </div>
                            </S.TableHeaderText>

                            {header.column.getCanFilter() ? (
                              <Filter column={header.column} table={table} />
                            ) : null}
                          </>
                        ) : (
                          <Skeleton width="100%" height="20px" />
                        )}
                      </S.TableHeaderWrapper>
                    )}
                  </S.TableHeader>
                );
              })}
            </S.TableRow>
          ))}
        </S.TableHead>
        <S.TableBody>
          {table.getRowModel().rows.length === 0 && data ? (
            <S.TableRow>
              <S.TableCell
                key={'no_results'}
                colSpan={table.getAllColumns().length}
                $uniqueCell
              >
                No results
              </S.TableCell>
            </S.TableRow>
          ) : data?.length ? (
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
          ) : (
            Array.from(
              { length: table.getState().pagination.pageSize },
              (_, index) => (
                <S.TableRow key={`row_${index}`}>
                  {columnDefs
                    .slice(
                      0,
                      columnDefs.length -
                        Object.keys(defaultColumnVisibility).length
                    )
                    .map((_, cellIndex) => (
                      <S.TableCell key={`row_${index}_${cellIndex}`}>
                        <Skeleton width="100%" height="20px" />
                      </S.TableCell>
                    ))}
                </S.TableRow>
              )
            )
          )}
        </S.TableBody>
      </S.Table>
      <S.FooterContainer>
        <Pagination table={table} />
      </S.FooterContainer>
      <SelectedRowsWidget
        table={table}
        onRowsDelete={onRowsDelete}
        editUrl={editUrl}
      />
    </S.TableContainer>
  );
};
