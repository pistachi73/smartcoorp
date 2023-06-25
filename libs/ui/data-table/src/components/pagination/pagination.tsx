import { Table } from '@tanstack/table-core';

import { DOTS, usePagination } from '@smartcoorp/smart-hooks';
import { Select } from '@smartcoorp/ui/select';

import { Styled as TableStyles } from './../../table.styles';
import { setPageSizeOptions } from './helpers';
import { Styled as S } from './pagination.styles';
type PaginationProps<T> = {
  table: Table<T>;
};

export const Pagination = <T,>({ table }: PaginationProps<T>) => {
  const paginationRange = usePagination({
    currentPage: table.getState().pagination.pageIndex,
    totalCount: table.getFilteredRowModel().rows.length,
    pageSize: table.getState().pagination.pageSize,
  });

  return (
    <S.Container>
      <div
        style={{
          width: 120,
        }}
      >
        <Select
          menuPlacement="top"
          size="small"
          options={setPageSizeOptions}
          onChange={(v) => table.setPageSize(parseInt(v))}
          defaultValue={table.getState().pagination.pageSize.toString()}
          value={table.getState().pagination.pageSize.toString()}
        />
      </div>
      <S.PaginationContainer>
        <TableStyles.StyledButton
          variant="secondary"
          size="small"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </TableStyles.StyledButton>
        {paginationRange &&
          paginationRange.map((pageNumber) => {
            if (pageNumber === DOTS) {
              return (
                <TableStyles.StyledButton
                  key={pageNumber}
                  size="small"
                  variant="secondary"
                  disabled
                  style={{ maxWidth: 36, padding: 0 }}
                >
                  &#8230;
                </TableStyles.StyledButton>
              );
            }
            return (
              <TableStyles.StyledButton
                key={pageNumber}
                variant={
                  parseInt(pageNumber as string) - 1 ===
                  table.getState().pagination.pageIndex
                    ? 'primary'
                    : 'secondary'
                }
                size="small"
                style={{ maxWidth: 36, padding: 0 }}
                onClick={() =>
                  table.setPageIndex(parseInt(pageNumber as string) - 1)
                }
              >
                {pageNumber}
              </TableStyles.StyledButton>
            );
          })}
        <TableStyles.StyledButton
          variant="secondary"
          size="small"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </TableStyles.StyledButton>
      </S.PaginationContainer>
    </S.Container>
  );
};
