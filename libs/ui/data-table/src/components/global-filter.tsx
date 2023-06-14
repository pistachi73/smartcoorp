import { Row } from '@tanstack/react-table';
import { FC } from 'react';
import { BiSearch } from 'react-icons/bi';

import { DebounceFormField } from '@smartcoorp/ui/form-field';

import { Styled as S } from './../table.styles';

export const globalFilterFn = <T,>(
  row: Row<T>,
  columnId: string,
  filterValue: string
) => {
  const search = filterValue.toLowerCase();

  let value = row.getValue(columnId) as string;
  if (typeof value === 'number') value = String(value);

  return value?.toLowerCase().includes(search);
};

type GlobalFilterProps = {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
};

export const GlobalFilter: FC<GlobalFilterProps> = ({
  globalFilter,
  setGlobalFilter,
}) => {
  return (
    <S.GlobalFilterContainer>
      <DebounceFormField
        size="small"
        type="text"
        icon={BiSearch}
        value={(globalFilter ?? '') as string}
        onChange={setGlobalFilter}
        placeholder={`Search globally...`}
        debounceTime={400}
      />
    </S.GlobalFilterContainer>
  );
};
