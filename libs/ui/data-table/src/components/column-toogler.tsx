import { Table as ReactTable } from '@tanstack/react-table';
import { BiColumns } from 'react-icons/bi';

import { Checkbox } from '@smartcoorp/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@smartcoorp/ui/popover';

import { fromCamelCaseToNormalCase } from '../helpers';
import { Styled as S } from '../table.styles';

type ColumnTogglerPropsFilterProps<T> = {
  table: ReactTable<T>;
};

export const ColumnToggler = <T,>({
  table,
}: ColumnTogglerPropsFilterProps<T>) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <S.StyledButton variant="secondary" size="small" icon={BiColumns}>
          Columns
        </S.StyledButton>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={5} alignOffset={-1}>
        <S.PoppoverContentContainer $width={220}>
          <Checkbox
            size="small"
            label="View all"
            checked={table.getIsAllColumnsVisible()}
            intermediate={table.getIsSomeColumnsVisible()}
            onChange={(v) => table.toggleAllColumnsVisible(v)}
          />
          <S.PopoverDivider />
          {table.getAllLeafColumns().map((column) => {
            if (column.id === 'select') return null;
            return (
              <Checkbox
                size="small"
                label={fromCamelCaseToNormalCase(column.id)}
                key={column.id}
                checked={column.getIsVisible()}
                onChange={(v) => column.toggleVisibility(v)}
              />
            );
          })}
        </S.PoppoverContentContainer>
      </PopoverContent>
    </Popover>
  );
};
