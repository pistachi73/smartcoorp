import { Column, Table as ReactTable } from '@tanstack/react-table';
import { FC } from 'react';
import { BiFilter } from 'react-icons/bi';

import { isDate, isNumber } from '@smartcoorp/smart-types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@smartcoorp/ui/popover';

import { Styled as S } from '../../table.styles';

import { DateFilter } from './date-filter';
import { NumberFilter } from './number-filter';
import { TextFilter } from './text-filter';

type FilterProps = {
  column: Column<any, any>;
  table: ReactTable<any>;
};

export const Filter: FC<FilterProps> = ({ column, table }) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const isFilteredColumn = column.getIsFiltered() || column.getIsSorted();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <S.InlineFilterButton
          size="small"
          variant="secondary"
          iconSize={18}
          icon={BiFilter}
          $isFilteredColumn={Boolean(isFilteredColumn)}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        />
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end">
        {isDate(firstValue) ? (
          <DateFilter column={column} />
        ) : isNumber(firstValue) ? (
          <NumberFilter column={column} />
        ) : (
          <TextFilter column={column} />
        )}
      </PopoverContent>
    </Popover>
  );
};
