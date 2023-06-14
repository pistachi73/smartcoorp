import { Column } from '@tanstack/react-table';
import { FC } from 'react';

import { DebounceFormField } from '@smartcoorp/ui/form-field';

import { Styled as S } from '../../table.styles';

import { SortFilters } from './sort-filters';

type TextFilterProps = {
  column: Column<any, any>;
};

export const TextFilter: FC<TextFilterProps> = ({ column }) => {
  return (
    <S.PoppoverContentContainer $width={220}>
      <S.FilterContainer $type="text">
        <DebounceFormField
          type="text"
          size="small"
          value={(column.getFilterValue() ?? '') as string}
          onChange={(value) => column.setFilterValue(value)}
          placeholder={`Search...`}
          debounceTime={400}
        />
        {column.getCanSort() ? <SortFilters column={column} /> : null}
      </S.FilterContainer>
    </S.PoppoverContentContainer>
  );
};
