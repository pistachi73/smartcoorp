import { format } from 'date-fns';
import { BiCalendar } from 'react-icons/bi';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@smartcoorp/ui/popover';
import { SingleCalendar } from '@smartcoorp/ui/single-calendar';

import { Styled as S } from './date-picker.styles';
import type { DateSinglePickerProps } from './date-single-picker.types';

export const DateSinglePicker = ({
  isDisabled,
  isError,
  size = 'medium',
  sizeConfined,
  sizeWide,
  selected,
  onSelect,
  withCustomValues,
}: DateSinglePickerProps) => {
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
            {selected ? (
              format(selected, 'PPP')
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
      <PopoverContent align="center">
        <SingleCalendar
          selected={selected}
          onSelect={onSelect}
          initialFocus
          withCustomValues={withCustomValues}
        />
      </PopoverContent>
    </Popover>
  );
};
