import { Column } from '@tanstack/react-table';
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi';

import { Styled as S } from '../../table.styles';

export type SortFilterProps = {
  column: Column<any, any>;
};

export const SortFilters = ({ column }: SortFilterProps) => {
  const isSortedAscending = column.getIsSorted() === 'asc';
  const isSortedDescending = column.getIsSorted() === 'desc';

  return (
    <>
      <S.StyledTextButton
        variant="text"
        iconSize={24}
        size="small"
        icon={BiUpArrowAlt}
        onClick={() => {
          isSortedAscending
            ? column.clearSorting()
            : column.toggleSorting(false, true);
        }}
        $selected={isSortedAscending}
      >
        Sort Ascending
      </S.StyledTextButton>
      <S.StyledTextButton
        variant="text"
        iconSize={24}
        size="small"
        icon={BiDownArrowAlt}
        onClick={() => {
          isSortedDescending
            ? column.clearSorting()
            : column.toggleSorting(true, true);
        }}
        $selected={isSortedDescending}
      >
        Sort Descending
      </S.StyledTextButton>
    </>
  );
};
