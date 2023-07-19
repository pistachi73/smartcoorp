import { isValid } from 'date-fns';

import type { Entries } from './util-types';

export function ObjectEntries<T extends object>(t: T): Entries<T>[] {
  return Object.entries(t) as any;
}

export const isDate = (value: any): value is Date => {
  const date = new Date(value);
  return isValid(date);
};
export const isNumber = (value: any): value is number =>
  typeof value === 'number' || !isNaN(parseInt(value));
