import { Column, FilterFn, Row } from '@tanstack/react-table';
import { FC, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Calendar } from '../../../calendar';
import { Styled as S } from '../../table.styles';

import { SortFilters } from './sort-filters';

type DateFilterProps = {
  column: Column<any, any>;
};
type FilterValue = [Date, Date] | undefined;

export const DateFilter: FC<DateFilterProps> = ({ column }) => {
  const filteredValue = column.getFilterValue() as FilterValue;

  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>({
    from: filteredValue?.[0] ? new Date(filteredValue[0]) : undefined,
    to: filteredValue?.[1] ? new Date(filteredValue[1]) : undefined,
  });

  return (
    <S.PoppoverContentContainer>
      <S.FilterContainer>
        <Calendar
          withBorder={false}
          mode="range"
          selected={selectedRange}
          onSelect={(range) => {
            const minValue = range?.from;
            const maxValue = range?.to;

            if (!minValue || !maxValue) {
              column.setFilterValue(undefined);
            } else {
              column.setFilterValue(() => [minValue, maxValue]);
            }

            setSelectedRange(range);
          }}
          withCustomValues={[
            {
              label: 'Last day',
              value: '-1_0',
            },
            {
              label: 'Last 15 days',
              value: '-15_0',
            },
            {
              label: 'Last 30 days',
              value: '-30_0',
            },
            {
              label: 'Last quarter',
              value: '-120_0',
            },
          ]}
        />
        {column.getCanSort() ? <SortFilters column={column} /> : null}
      </S.FilterContainer>
    </S.PoppoverContentContainer>
  );
};

export const dateBetweenFilterFn: FilterFn<T> = (
  row: Row<any>,
  id: string,
  filterValues: FilterValue
) => {
  console.log(id);
  if (!filterValues) return true;
  const sd = new Date(filterValues[0]);
  const ed = new Date(filterValues[1]);

  const cellDate = new Date(row.getValue(id));

  return cellDate >= sd && cellDate <= ed;
};
