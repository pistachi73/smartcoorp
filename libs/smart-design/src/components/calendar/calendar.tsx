import { format } from 'date-fns';
import { useRef } from 'react';
import {
  CaptionProps,
  DayProps,
  useDayRender,
  useNavigation,
} from 'react-day-picker';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import { Select } from '../select';

import { Styled as S } from './calendar.styles';
import type {
  CalendarProps,
  RangeCustomValuesOptions,
  SingleCustomValuesOptions,
} from './calendar.types';
import {
  customValuesRangeSelectFormatter,
  customValuesSingleSelectFormatter,
} from './helpers';

const Caption = (props: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <S.CaptionContainer>
      <S.CaptionButtonContainer
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <BiChevronLeft size={16} />
      </S.CaptionButtonContainer>
      <S.CaptionLabel>{format(props.displayMonth, 'MMMM yyy')}</S.CaptionLabel>
      <S.CaptionButtonContainer
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <BiChevronRight size={16} />
      </S.CaptionButtonContainer>
    </S.CaptionContainer>
  );
};

const Day = (props: DayProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { date, displayMonth } = props;
  const { divProps, isButton, buttonProps } = useDayRender(
    date,
    displayMonth,
    buttonRef
  );

  const t = format(date, 'dd');
  return isButton ? (
    <button ref={buttonRef} {...buttonProps}>
      {t}
    </button>
  ) : (
    <div {...divProps}>{t}</div>
  );
};

export const Calendar = ({ withBorder = true, ...props }: CalendarProps) => {
  if (props.mode === 'single') {
    const onSelectChangeHandler = (val: SingleCustomValuesOptions['value']) => {
      if (!props.onSelect) return;
      const selectedDate = customValuesSingleSelectFormatter(val);
      if (selectedDate === -1) return;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      props?.onSelect(selectedDate);
    };

    return (
      <S.Container $withBorder={withBorder}>
        {props?.withCustomValues && (
          <S.SelectContainer>
            <Select
              onChange={onSelectChangeHandler}
              size="small"
              placeholder="Select date..."
              options={props.withCustomValues}
            />
          </S.SelectContainer>
        )}
        <S.DayPicker
          components={{
            Caption,
            Day,
          }}
          weekStartsOn={1}
          fixedWeeks
          {...props}
        />
      </S.Container>
    );
  } else if (props.mode === 'range') {
    const onSelectChangeHandler = (val: RangeCustomValuesOptions['value']) => {
      if (!props.onSelect) return;
      const newRange = customValuesRangeSelectFormatter(val);
      if (newRange === -1) return;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      props?.onSelect(newRange);
    };
    return (
      <S.Container $withBorder={withBorder}>
        {props?.withCustomValues && (
          <S.SelectContainer>
            <Select
              onChange={onSelectChangeHandler}
              size="small"
              placeholder="Select range..."
              options={props.withCustomValues}
            />
          </S.SelectContainer>
        )}
        <S.DayPicker
          components={{
            Caption,
            Day,
          }}
          weekStartsOn={1}
          fixedWeeks
          {...props}
        />
      </S.Container>
    );
  } else {
    return (
      <S.Container $withBorder={withBorder}>
        <S.DayPicker
          components={{
            Caption,
            Day,
          }}
          weekStartsOn={1}
          fixedWeeks
          {...props}
        />
      </S.Container>
    );
  }
};
