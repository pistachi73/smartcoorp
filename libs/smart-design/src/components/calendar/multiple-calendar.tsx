import { DayPickerMultipleProps } from 'react-day-picker';
import { DefaultTheme, StyledComponent } from 'styled-components';

import { Caption, Day } from './calendar';
import { Styled as S } from './calendar.styles';
import type { MultipleCalendarProps } from './calendar.types';

const DayPicker = S.DayPicker as StyledComponent<
  (props: DayPickerMultipleProps) => JSX.Element,
  DefaultTheme,
  {},
  never
>;

export const MultipleCalendar = ({
  withBorder = true,
  ...props
}: MultipleCalendarProps) => {
  console.log(props);
  return (
    <S.Container $withBorder={withBorder}>
      <DayPicker
        components={{
          Caption,
          Day,
        }}
        weekStartsOn={1}
        fixedWeeks
        {...props}
        mode="multiple"
      />
    </S.Container>
  );
};
