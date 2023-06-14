import { DayPickerMultipleProps } from 'react-day-picker';
import { DefaultTheme, StyledComponent } from 'styled-components';

import { Caption, Day, Styled as S } from '@smartcoorp/ui/shared';

import type { MultipleCalendarProps } from './multiple-calendar.types';

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
