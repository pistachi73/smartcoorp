import { ColumnFiltersState, Updater } from '@tanstack/react-table';
import { useCallback } from 'react';
import { BiTrash } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';

import { isDate, isNumber } from '@smartcoorp/smart-types';
import { Body } from '@smartcoorp/ui/body';
import { ResizablePanel } from '@smartcoorp/ui/resizable-panel';

import { fromCamelCaseToNormalCase } from '../../helpers';
import { Styled as S } from '../../table.styles';

type ColumnFiltersProps = {
  filters: ColumnFiltersState;
  setColumnFilters: (updater: Updater<ColumnFiltersState>) => void;
};

export const ColumnFilters = ({
  filters,
  setColumnFilters,
}: ColumnFiltersProps) => {
  const removeAllFilters = useCallback(() => {
    setColumnFilters([]);
  }, [setColumnFilters]);

  const removeColumnFilter = useCallback(
    (id: string) => {
      setColumnFilters((prev) => prev.filter((filter) => filter.id !== id));
    },
    [setColumnFilters]
  );

  return (
    <ResizablePanel minHeight={36}>
      <S.LeftTableActionsContainer key={filters.length}>
        {filters.length ? (
          <S.RemoveButton
            variant="secondary"
            size="small"
            icon={BiTrash}
            onClick={removeAllFilters}
            key="remove-all-filters"
          />
        ) : null}

        {filters.map(({ id, value }) => {
          const columnName = fromCamelCaseToNormalCase(id);
          if (Array.isArray(value) && isDate(value[0]) && isDate(value[1])) {
            return (
              <ColumnFilterDisplay
                id={id}
                key={id}
                removeColumnFilter={removeColumnFilter}
                filterType="date"
              >
                <Body size="xsmall" noMargin>
                  <S.FilterDisplayTextSpan>
                    {columnName} between{' '}
                  </S.FilterDisplayTextSpan>
                  <b>{value[0].toLocaleDateString()}</b>
                  <S.FilterDisplayTextSpan> and </S.FilterDisplayTextSpan>
                  <b>{value[1].toLocaleDateString()}</b>
                </Body>
              </ColumnFilterDisplay>
            );
          } else if (
            Array.isArray(value) &&
            (isNumber(value[0]) || isNumber(value[1]))
          ) {
            return (
              <ColumnFilterDisplay
                id={id}
                key={id}
                removeColumnFilter={removeColumnFilter}
                filterType="number"
              >
                <Body size="xsmall" noMargin>
                  <S.FilterDisplayTextSpan>
                    {columnName} between{' '}
                  </S.FilterDisplayTextSpan>
                  <b>{value[0] ?? '-∞'}</b>
                  <S.FilterDisplayTextSpan> and </S.FilterDisplayTextSpan>
                  <b>{value[1] ?? '∞'}</b>
                </Body>
              </ColumnFilterDisplay>
            );
          } else if (typeof value === 'string') {
            return (
              <ColumnFilterDisplay
                id={id}
                key={id}
                removeColumnFilter={removeColumnFilter}
                filterType="text"
              >
                <Body size="xsmall" noMargin>
                  <S.FilterDisplayTextSpan>
                    {columnName} contains
                  </S.FilterDisplayTextSpan>{' '}
                  <b>{value}</b>
                </Body>
              </ColumnFilterDisplay>
            );
          }
        })}
      </S.LeftTableActionsContainer>
    </ResizablePanel>
  );
};

const ColumnFilterDisplay = ({
  children,
  id,
  removeColumnFilter,
  filterType,
}: {
  children: React.ReactNode;
  id: string;
  removeColumnFilter: (id: string) => void;
  filterType: 'date' | 'number' | 'text';
}) => {
  return (
    <S.FilterDisplayContainer key={id}>
      <S.FilterDisplayDot $type={filterType} />
      {children}
      <button onClick={() => removeColumnFilter(id)}>
        <RxCross2 size={14} />
      </button>
    </S.FilterDisplayContainer>
  );
};
