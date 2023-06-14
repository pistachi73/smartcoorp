import { addDays, nextMonday } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { RangeCustomValuesOptions } from './range-calendar.types';

const isTypeNumberNumber = (
  val: RangeCustomValuesOptions['value']
): val is `${number}_${number}` =>
  typeof parseInt(val.split('_')[0]) === 'number' &&
  typeof parseInt(val.split('_')[1]) === 'number';

export const customValuesRangeSelectFormatter = (
  val: RangeCustomValuesOptions['value']
): DateRange | -1 => {
  const dateRange: DateRange = {
    from: new Date(),
    to: new Date(),
  };
  if (isTypeNumberNumber(val)) {
    const splitedValues = val.split('_');
    dateRange.from = addDays(new Date(), parseInt(splitedValues[0]));
    dateRange.to = addDays(new Date(), parseInt(splitedValues[1]));
  }
  if (val === 'next-week') {
    const monday = nextMonday(new Date());
    dateRange.from = monday;
    dateRange.to = addDays(monday, 6);
  }

  return dateRange;
};
