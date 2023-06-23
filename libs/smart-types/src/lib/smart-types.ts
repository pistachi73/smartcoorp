import type { Entries } from './util-types';

export function ObjectEntries<T extends object>(t: T): Entries<T>[] {
  return Object.entries(t) as any;
}

export const isDate = (value: any): value is Date => value instanceof Date;
export const isNumber = (value: any): value is number =>
  typeof value === 'number' || !isNaN(parseInt(value));
