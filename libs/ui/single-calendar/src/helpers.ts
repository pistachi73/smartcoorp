import { addDays } from 'date-fns';

import { SingleCustomValuesOptions } from './single-calendar.types';

const isNumber = (
  val: SingleCustomValuesOptions['value']
): val is `${number}` => typeof parseInt(val) === 'number';

export const customValuesSingleSelectFormatter = (
  val: SingleCustomValuesOptions['value']
): Date | -1 => {
  if (isNumber(val)) {
    return addDays(new Date(), parseInt(val));
  }

  return -1;
};
