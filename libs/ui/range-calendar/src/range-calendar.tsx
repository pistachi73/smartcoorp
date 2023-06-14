import { DayPickerRangeProps } from 'react-day-picker';
import { DefaultTheme, StyledComponent } from 'styled-components';

import { Select } from '@smartcoorp/ui/select';
import { Caption, Day, Styled as S } from '@smartcoorp/ui/shared';

import { customValuesRangeSelectFormatter } from './helpers';
import type {
  RangeCalendarProps,
  RangeCustomValuesOptions,
} from './range-calendar.types';

const DayPicker = S.DayPicker as StyledComponent<
  (props: DayPickerRangeProps) => JSX.Element,
  DefaultTheme,
  {},
  never
>;

export const RangeCalendar = ({
  withBorder = true,
  onSelect,
  selected,
  min,
  max,
  withCustomValues,
  ...props
}: RangeCalendarProps) => {
  const onSelectChangeHandler = (val: RangeCustomValuesOptions['value']) => {
    if (!onSelect) return;
    const newRange = customValuesRangeSelectFormatter(val);
    if (newRange === -1) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    onSelect(newRange);
  };

  console.log(props);
  return (
    <S.Container $withBorder={withBorder}>
      {withCustomValues && (
        <S.SelectContainer>
          <Select
            onChange={onSelectChangeHandler}
            size="small"
            placeholder="Select range..."
            options={withCustomValues}
          />
        </S.SelectContainer>
      )}
      <DayPicker
        mode="range"
        components={{
          Caption,
          Day,
        }}
        weekStartsOn={1}
        fixedWeeks
        selected={selected}
        onSelect={onSelect}
        min={min}
        max={max}
        {...props}
      />
    </S.Container>
  );
};
