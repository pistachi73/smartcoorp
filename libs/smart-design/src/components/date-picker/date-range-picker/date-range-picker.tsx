import { format } from 'date-fns';
import { BiCalendar } from 'react-icons/bi';

import { RangeCalendar } from '../../calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../popover';
import { Styled as S } from '../date-picker.styles';
import type { DateRangePickerProps } from '../date-picker.types';

export const DateRangePicker = ({
  isDisabled,
  isError,
  size = 'medium',
  sizeConfined,
  sizeWide,
  selected,
  onSelect,
  withCustomValues,
}: DateRangePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <S.Container disabled={isDisabled} $disabled={isDisabled}>
          <S.InputContainer
            $size={size}
            $sizeConfined={sizeConfined}
            $sizeWide={sizeWide}
            $error={isError}
          >
            <S.IconContainer
              $size={size}
              $sizeConfined={sizeConfined}
              $sizeWide={sizeWide}
            >
              <BiCalendar size={16} />
            </S.IconContainer>
            {selected?.from ? (
              selected.to ? (
                <>
                  {format(selected.from, 'LLL dd, y')} -{' '}
                  {format(selected.to, 'LLL dd, y')}
                </>
              ) : (
                format(selected.from, 'LLL dd, y')
              )
            ) : (
              <S.Placeholder
                $size={size}
                $sizeConfined={sizeConfined}
                $sizeWide={sizeWide}
              >
                Pick a date
              </S.Placeholder>
            )}
          </S.InputContainer>
        </S.Container>
      </PopoverTrigger>
      <PopoverContent align="start">
        <RangeCalendar
          selected={selected}
          onSelect={onSelect}
          initialFocus
          withCustomValues={withCustomValues}
        />
      </PopoverContent>
    </Popover>
  );
};
