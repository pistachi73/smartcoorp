import { format } from 'date-fns';
import { useRef } from 'react';
import {
  CaptionProps,
  DayProps,
  useDayRender,
  useNavigation,
} from 'react-day-picker';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import { Styled as S } from './calendar.styles';

export const Caption = (props: CaptionProps) => {
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

export const Day = (props: DayProps) => {
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
