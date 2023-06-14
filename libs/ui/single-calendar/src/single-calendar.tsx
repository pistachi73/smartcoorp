import { DayPickerSingleProps } from 'react-day-picker';
import { DefaultTheme, StyledComponent } from 'styled-components';

import { ResizablePanel } from '@smartcoorp/smart-design';
import { Select } from '@smartcoorp/ui/select';
import { Caption, Day, Styled as S } from '@smartcoorp/ui/shared';

import { customValuesSingleSelectFormatter } from './helpers';
import type {
  SingleCalendarProps,
  SingleCustomValuesOptions,
} from './single-calendar.types';

const DayPicker = S.DayPicker as StyledComponent<
  (props: DayPickerSingleProps) => JSX.Element,
  DefaultTheme,
  {},
  never
>;

export const SingleCalendar = ({
  withBorder = true,
  ...props
}: SingleCalendarProps) => {
  const onSelectChangeHandler = (val: SingleCustomValuesOptions['value']) => {
    if (!props.onSelect) return;
    const newSelectedDate = customValuesSingleSelectFormatter(val);
    if (newSelectedDate === -1) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    props.onSelect(newSelectedDate);
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
      <DayPicker
        components={{
          Caption,
          Day,
        }}
        weekStartsOn={1}
        // fixedWeeks
        {...props}
        mode="single"
      />
    </S.Container>
  );
};
