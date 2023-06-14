import { Column } from '@tanstack/react-table';
import { FC } from 'react';

import { DebounceFormField } from '@smartcoorp/ui/form-field';

import { Styled as S } from '../../table.styles';

import { SortFilters } from './sort-filters';

type NumberFilterProps = {
  column: Column<any, any>;
};

export const NumberFilter: FC<NumberFilterProps> = ({ column }) => {
  return (
    <S.PoppoverContentContainer $width={240}>
      <S.FilterContainer $type="number">
        <S.NumberFilterContainer>
          <DebounceFormField
            type="number"
            size="small"
            value={((column.getFilterValue() as any)?.[0] ?? '') as string}
            onChange={(value) => {
              column.setFilterValue((old: any) => [value, old?.[1]]);
            }}
            placeholder={`Min`}
            debounceTime={400}
          />
          <DebounceFormField
            type="number"
            size="small"
            value={((column.getFilterValue() as any)?.[1] ?? '') as string}
            onChange={(value) =>
              column.setFilterValue((old: any) => [old?.[0], value])
            }
            placeholder={`Max`}
            debounceTime={400}
          />
        </S.NumberFilterContainer>
        {column.getCanSort() ? <SortFilters column={column} /> : null}
      </S.FilterContainer>
    </S.PoppoverContentContainer>
  );
};
